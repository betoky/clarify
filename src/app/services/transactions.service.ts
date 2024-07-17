import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';
import { Operation, Transaction } from '../models/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private db = inject(Firestore);
    private transactionsRef = collection(this.db, "principal/bank/transactions");
    private transactionNameRef = collection(this.db, "principal/bank/transaction-name");
    
    operations = toSignal(
        collectionData(this.transactionNameRef, {idField: 'name'}) as Observable<Operation[]>,
        {initialValue: []}
    );

    async getTransactions() {
        const data = await getDocs(this.transactionsRef);

        if (data.empty) return [];
    
        return data.docs.map(doc => {
            const {date, ...data} = doc.data();
            return {
                id: doc.id,
                date: date.toDate(),
                ...data
            }
        }) as Transaction[];
    }

    listenToTransactions(): Observable<Transaction[]> {
        return collectionData(this.transactionsRef, {idField: 'id'})
            .pipe(
                map( (data: any) => data.map((doc: any) => {
                    const {date, ...rest} = doc;
                    return {date: date.toDate(), ...rest}
                }))
            );
    }
}
