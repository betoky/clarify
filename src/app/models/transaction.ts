import { Timestamp } from "@angular/fire/firestore";

export type OperationName = 'deposit' | 'withdral' | 'salary' | 'credit-card' | 'bank-fee';

export type NewTransaction<T extends BaseTransaction> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export type Transaction = DepositTransaction | WithdralTransaction | SalaryTransaction | CreditCardTransaction | BankFeeTransaction;

export type NewTransactionType = NewTransaction<Transaction>;

export type TransactionFire = Omit<Transaction, 'date' | 'created_at' | 'updated_at'> & {
    date: Timestamp,
    created_at: Timestamp,
    updated_at: Timestamp | null
}

export interface BaseTransaction {
    id: string;
    operation: OperationName;
    incoming: boolean;
    amount: number;
    date: Date;
    created_at: Date;
    updated_at: Date | null;
    note: string | null;
}

export interface DepositTransaction extends BaseTransaction {
    operation: 'deposit';
    agency: string;
}

export type WithdralType = 'gab' | 'check';
export interface WithdralTransaction extends BaseTransaction {
    operation: 'withdral';
    type: WithdralType;
    location: string;
    spent: number;
}

export interface SalaryTransaction extends BaseTransaction {
    operation: 'salary';
    company: string;
}

export type CreditCardType = 'TPE' | 'VISA';
export interface CreditCardTransaction extends BaseTransaction {
    operation: 'credit-card';
    type: CreditCardType;
    fee: number | null;
}

export type BankFeeType = 'AGIOS' | 'CARD';
export interface BankFeeTransaction extends BaseTransaction {
    type: BankFeeType;
    operation: 'bank-fee';
}

export interface Operation {
    name: OperationName;
    title: string;
}
