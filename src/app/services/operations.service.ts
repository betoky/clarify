import { inject, Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { BalanceService } from './balance.service';
import {
    BankFeeTransaction,
    BankFeeType,
    CreditCardTransaction,
    CreditCardType,
    DepositTransaction,
    NewTransaction,
    NewTransactionType,
    SalaryTransaction,
    WithdralTransaction,
    WithdralType
} from '../models/transaction';

/**
 * This service is for handling different types of transactions
*/
@Injectable({
    providedIn: 'root'
})
export class OperationsService {
    private tranService = inject(TransactionsService);
    private balanceService = inject(BalanceService);

    saveSalary(amount: number, date: Date, company: string, note: string|null = null) {
        const salaryTransaction: NewTransaction<SalaryTransaction> = {
            amount, date, company, incoming: true, operation: 'salary', note
        }
        return this.saveTransaction(salaryTransaction);
    }

    depositMoney(amount: number, date: Date, agency: string, note: string|null = null) {
        const depositTransaction: NewTransaction<DepositTransaction> = {
            amount, date, agency, incoming: true, operation: 'deposit', note
        }
        return this.saveTransaction(depositTransaction);
    }

    withdrawMoney(amount: number, date: Date, type: WithdralType, location: string, note: string|null = null) {
        const withdralTransaction: NewTransaction<WithdralTransaction> = {
            amount, date, type, location, spent: 0, incoming: false, operation: 'withdral', note
        }
        return this.saveTransaction(withdralTransaction);
    }

    cardPayment(amount: number, date: Date, type: CreditCardType, fee: number|null = null, note: string|null = null) {
        const creditCardTransaction: NewTransaction<CreditCardTransaction> = {
            amount, date, type , incoming: false, operation: 'credit-card', fee, note
        }
        return this.saveTransaction(creditCardTransaction);
    }

    recordBankCharge(amount: number, date: Date, type: BankFeeType, note: string|null = null) {
        const bankFeeTransaction: NewTransaction<BankFeeTransaction> = {
            amount, date, incoming: false, operation: 'bank-fee', type, note
        }
        return this.saveTransaction(bankFeeTransaction);
    }

    private async saveTransaction(data: NewTransactionType) {
        const {amount, incoming} = data;
        if (incoming) {
            await this.balanceService.increase(amount);
        } else {
            await this.balanceService.decrease(amount);
        }
        return this.tranService.addTransaction(data);
    }
}
