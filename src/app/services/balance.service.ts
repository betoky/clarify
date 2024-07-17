import { inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class BalanceService {
    private db = inject(Firestore);
    balance = signal(0);

    constructor() {
        onSnapshot(doc(this.db, "principal/bank"), {
            next: bank => {
                if (bank.exists()) {
                    const {balance} = bank.data();
                    this.balance.set(balance)
                }
            }
        })
    }

    increase(amount: number) {
        return updateDoc(doc(this.db, 'principal/bank'), {balance: this.balance() + amount})
    }

    decrease(amount: number) {
        return updateDoc(doc(this.db, 'principal/bank'), {balance: this.balance() - amount})
    }
}
