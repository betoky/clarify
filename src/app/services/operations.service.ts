import { inject, Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { BalanceService } from './balance.service';
import {
    BankFeeTransaction,
    CreditCardTransaction,
    CreditCardType,
    DepositTransaction,
    SalaryTransaction,
    WithdralTransaction,
    WithdralType
} from '../models/transaction';

/**
 * TODO: Optimize creation of operations(transactions)
*/
type NewSalaryTransaction = Omit<SalaryTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;
type NewDepositTransaction = Omit<DepositTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;
type NewWithdralTransaction = Omit<WithdralTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;
type NewCreditCardTransaction = Omit<CreditCardTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;
type NewBankFeeTransaction = Omit<BankFeeTransaction, 'id' | 'note' | 'created_at' | 'update_at'>;

type ToSaveTransaction = NewSalaryTransaction | NewDepositTransaction | NewWithdralTransaction | NewCreditCardTransaction | NewBankFeeTransaction;

/**
 * This service is for handling different types of transactions
*/
@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    private tranService = inject(TransactionsService);
    private balanceService = inject(BalanceService);

    saveSalary(amount: number, date: Date, company: string, note?: string) {
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

    withdrawMoney(amount: number, date: Date, type: WithdralType, location: string, note?: string) {
        const withdralTransaction: NewWithdralTransaction = {
            amount, date, type, location, spent: 0, incoming: false, operation: 'withdral'
        }
        return this.saveTransaction(withdralTransaction, note);
    }

    cardPayment(amount: number, date: Date, type: CreditCardType, fee?: number, note?: string) {
        const creditCardTransaction: NewCreditCardTransaction = {
            amount, date, type , incoming: false, operation: 'credit-card'
        }
        if (fee) {
            creditCardTransaction.fee = fee;
        }
        return this.saveTransaction(creditCardTransaction, note);
    }

    recordBankCharge(amount: number, date: Date, note?: string) {
        const bankFeeTransaction: NewBankFeeTransaction = {
            amount, date, incoming: false, operation: 'bank-fee'
        }
        return this.saveTransaction(bankFeeTransaction, note);
    }

    private async saveTransaction(data: ToSaveTransaction, note?: string) {
        const transaction: ToSaveTransaction & { note?: string } = { ...data };
        if (note) {
            transaction.note = note;
        }
        const {amount, incoming} = data;
        if (incoming) {
            await this.balanceService.increase(amount);
        } else {
            await this.balanceService.decrease(amount);
        }
        return this.tranService.addTransaction(transaction);
    }
}
