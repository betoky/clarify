import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    addDoc, collection, collectionData, count, doc, Firestore,
    getAggregateFromServer, getCountFromServer,
    getDoc, getDocs, limit, limitToLast, orderBy, query, serverTimestamp, sum,
    updateDoc, where
} from '@angular/fire/firestore';
import { NewTransaction, Operation, OperationName, Transaction, TransactionFire } from '../models/transaction';
import { Paginate } from '../models/pagination';


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
    private operations$ = collectionData(this.transactionNameRef, { idField: 'name' }) as Observable<Operation[]>;
    private totalNumber?: number;

    operations = toSignal(this.operations$.pipe(catchError(e => of(undefined))), { initialValue: undefined });

    async getTotalNumber() {
        if (!this.totalNumber) {
            const snapshot = await getCountFromServer(this.transactionsRef);
            console.log("++ count snapshot", snapshot);
            this.totalNumber = snapshot.data().count;
        }

        return this.totalNumber;
    }

    async getTransactions(p: Partial<Paginate> = {}) {
        const {max = 10, orderby = 'date', sortby = 'ASC'} = p;
        const l = sortby === 'ASC' ? limit(max) : limitToLast(max);
        const q = query(this.transactionsRef, orderBy(orderby), l);
        const data = await getDocs(q);

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

    async getTransactionById(id: string) {
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

    lastTransactions(limit: number = 5) {
        const last20TransactionQuery = query(this.transactionsRef, orderBy("date"), limitToLast(limit));
        const transactions$ = collectionData(last20TransactionQuery, { idField: 'id' }) as Observable<TransactionFire[]>;

        return transactions$.pipe(
            map((data) => data.map(doc => {
                const { date, created_at, updated_at, ...rest } = doc;
                return {
                    date: date.toDate(),
                    created_at: created_at.toDate(),
                    updated_at: updated_at ? created_at.toDate() : null,
                    ...rest
                } as Transaction;;
            })),
            map((data) => data.sort((a, b) => {
                if (a.date === b.date) {
                    return 0;
                } else if (b.date > a.date) {
                    return 1
                }
                return -1
            })),
            catchError(() => of(null))
        );
    }

    async addTransaction(data: NewTransaction<Transaction>) {
        const res = await addDoc(this.transactionsRef, {
            created_at: serverTimestamp(), update_at: null, ...data
        })
        // increment total number of transactions
        this.totalNumber && this.totalNumber++;
        
        return res.id
    }

    async updateTransaction(id: string, data: Partial<NewTransaction<Transaction>>) {
        const ref = doc(this.db, "principal/bank/transactions/" + id);
        return updateDoc(ref, { update_at: serverTimestamp(), ...data });
    }

    async save(t: Omit<Transaction, 'id'>) {
        return addDoc(this.transactionsRef, t);
    }
}
