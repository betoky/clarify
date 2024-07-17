import { inject, Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { DepositTransaction, SalaryTransaction } from '../models/transaction';

type NewSalaryTransaction = Omit<SalaryTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;
type NewDepositTransaction = Omit<DepositTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;

type ToSaveTransaction = NewSalaryTransaction | NewDepositTransaction;

@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    private tranService = inject(TransactionsService);

    setSalary(amount: number, date: Date, company: string, note?: string) {
        const salaryTransaction: NewSalaryTransaction = {
            amount, date, company, incoming: true, operation: 'salary'
        }
        return this.saveTransaction(salaryTransaction, note);
    }

    depositMoney(amount: number, date: Date, agency: string, note?: string) {
        const depositTransaction: NewDepositTransaction = {
            amount, date, agency, incoming: true, operation: 'deposit'
        }
        return this.saveTransaction(depositTransaction, note);
    }

    private saveTransaction(data: ToSaveTransaction, note?: string) {
        const transaction: ToSaveTransaction & { note?: string } = { ...data };
        if (note) {
            transaction.note = note;
        }
        return this.tranService.addTransaction(transaction);
    }
}
