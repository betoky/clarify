import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, getDocs, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { Operation, Transaction } from '../models/transaction';

/**
 * This service is for the handling the transactions themselves 
*/
@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private db = inject(Firestore);
    private transactionsRef = collection(this.db, "principal/bank/transactions");
    private transactionNameRef = collection(this.db, "principal/bank/transaction-name");

    operations = toSignal(
        collectionData(this.transactionNameRef, { idField: 'name' }) as Observable<Operation[]>,
        { initialValue: [] }
    );

    async getTransactions() {
        const data = await getDocs(this.transactionsRef);

        if (data.empty) return [];

        return data.docs.map(doc => {
            const { date, ...data } = doc.data();
            return {
                id: doc.id,
                date: date.toDate(),
                ...data
            }
        }) as Transaction[];
    }

    listenToTransactions(): Observable<Transaction[]> {
        return collectionData(this.transactionsRef, { idField: 'id' })
            .pipe(
                map((data: any) => data.map((doc: any) => {
                    const { date, ...rest } = doc;
                    return { date: date.toDate(), ...rest }
                }))
            );
    }

    addTransaction(data: Omit<Transaction, 'id' | 'created_at' | 'update_at'>) {
        return addDoc(this.transactionsRef, {
            created_at: serverTimestamp(), update_at: null, ...data
        })
    }

    updateTransaction(id: string, data: Partial<Omit<Transaction, 'id' | 'created_at' | 'update_at'>>) {
        const ref = doc(this.db, "principal/bank/transactions/" + id);
        return updateDoc(ref, { update_at: serverTimestamp(), ...data });
    }

    getDoc(id: string) {
        const ref = doc(this.db, "principal/bank/transactions/" + id);
        return getDoc(ref)
    }
}
