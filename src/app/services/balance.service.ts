import { inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, onSnapshot, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BalanceService {
    private db = inject(Firestore);
    private isloggedIn$ = inject(AuthService).isLoggedIn$;
    private bankUnsub?: Unsubscribe;
    balance = signal<number | undefined>(undefined);

    constructor() {
        this.isloggedIn$.subscribe({
            next: isLoggedIn => {
                if (isLoggedIn) {
                    this.bankUnsub = onSnapshot(doc(this.db, "principal/bank"), {
                        next: bank => {
                            if (bank.exists()) {
                                const { balance } = bank.data();
                                this.balance.set(balance)
                            }
                        },
                        error: () => {
                            this.balance.set(undefined);
                            this.bankUnsub && this.bankUnsub();
                        }
                    })
                } else {
                    this.balance.set(undefined);
                    this.bankUnsub && this.bankUnsub()
                }
            }
        })
    }

    increase(amount: number) {
        const currentBalance = this.balance();
        if (!currentBalance) return
        return updateDoc(doc(this.db, 'principal/bank'), { balance: currentBalance + amount })
    }

    decrease(amount: number) {
        const currentBalance = this.balance();
        if (!currentBalance) return
        return updateDoc(doc(this.db, 'principal/bank'), { balance: currentBalance - amount })
    }
}
