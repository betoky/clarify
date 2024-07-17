import { inject, Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { SalaryTransaction } from '../models/transaction';

type NewSalaryTransaction = Omit<SalaryTransaction, 'id' | 'created_at' | 'update_at'>;

@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    private tranService = inject(TransactionsService);

    setSalary(amount: number, date: Date, company: string, note?: string) {
        const salaryTransaction: NewSalaryTransaction = {
            amount, date, company, incoming: true, operation: 'salary'
        }
        if (note) {
            salaryTransaction.note = note;
        }
        return this.tranService.addTransaction(salaryTransaction);
    }
}
