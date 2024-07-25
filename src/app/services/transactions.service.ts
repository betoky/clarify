import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    addDoc, collection, collectionData, count, doc, Firestore, getAggregateFromServer,
    getDoc, getDocs, limitToLast, orderBy, query, serverTimestamp, sum,
    updateDoc, where
} from '@angular/fire/firestore';
import { NewTransaction, Operation, OperationName, Transaction, TransactionFire } from '../models/transaction';


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
            const { date, created_at, updated_at, ...data } = doc.data() as Omit<TransactionFire, 'id'>;
            return {
                id: doc.id,
                date: date.toDate(),
                created_at: created_at.toDate(),
                updated_at: updated_at ? updated_at.toDate() : null,
                ...data
            }
        }) as Transaction[];
    }

    lastTransactions(limit: number = 5): Observable<Transaction[]> {
        const last20TransactionQuery = query(this.transactionsRef, orderBy("date"), limitToLast(limit))
        return collectionData(last20TransactionQuery, { idField: 'id' })
            .pipe(
                map((data: TransactionFire[]) => data.map((doc) => {
                    const { date, created_at, updated_at, ...rest } = doc;
                    return {
                        date: date.toDate(),
                        created_at: created_at.toDate(),
                        updated_at: updated_at ? created_at.toDate() : null,
                        ...rest
                    }
                })),
                map((data: Transaction[]) => data.sort((a, b) => {
                    if (a.date === b.date) {
                        return 0;
                    } else if (b.date > a.date) {
                        return 1
                    }
                    return -1
                }))
            );
    }

    addTransaction(data: NewTransaction<Transaction>) {
        return addDoc(this.transactionsRef, {
            created_at: serverTimestamp(), update_at: null, ...data
        })
    }

    updateTransaction(id: string, data: Partial<NewTransaction<Transaction>>) {
        const ref = doc(this.db, "principal/bank/transactions/" + id);
        return updateDoc(ref, { update_at: serverTimestamp(), ...data });
    }

    getDoc(id: string) {
        const ref = doc(this.db, "principal/bank/transactions/" + id);
        return getDoc(ref)
    }

    async getTransactionByOperation(op: OperationName) {
        const q = query(this.transactionsRef, where('operation', '==', op));
        return getAggregateFromServer(q, {
            total: count(),
            totalAmount: sum('amount')
        })


        // const data = await getDocs(q)

        // if (data.empty) return [];

        // return data.docs.map(doc => {
        //     const { date, created_at, update_at, ...data } = doc.data();
        //     return {
        //         id: doc.id,
        //         date: date.toDate(),
        //         created_at: created_at.toDate(),
        //         update_at: update_at ? update_at.toDate() : null,
        //         ...data
        //     }
        // }) as Transaction[];
    }
    
    save(t: Omit<Transaction, 'id'>) {
        return addDoc(this.transactionsRef, t);
    }
}
