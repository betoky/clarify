export interface BaseTransaction {
    operation: OperationName;
    id: string;
    amount: number;
    date: Date;
    incoming: boolean;
    note?: string;
}

export interface DepositTransaction extends BaseTransaction {
    operation: 'deposit';
    agency: string;
}

export interface WithdralTransaction extends BaseTransaction {
    operation: 'withdral';
    type: 'gab' | 'check' | 'transfer';
    place?: string;
    spent?: number;
}

export interface SalaryTransaction extends BaseTransaction {
    operation: 'salary';
    company: string;
}

export interface CreditCardTransaction extends BaseTransaction {
    operation: 'credit-card';
    type: 'TPE' | 'VISA'
}

export type Transaction = DepositTransaction | WithdralTransaction | SalaryTransaction | CreditCardTransaction;

export interface Operation {
    name: OperationName;
    title: string;
}

export type OperationName = 'deposit' | 'withdral' | 'salary' | 'credit-card';