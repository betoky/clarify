export interface BaseTransaction {
    id: string;
    operation: OperationName;
    incoming: boolean;
    amount: number;
    date: Date;
    created_at: Date;
    update_at: Date | null;
    note?: string;
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
    fee?: number;
}

export interface BankFeeTransaction extends BaseTransaction {
    operation: 'bank-fee';
}

export type Transaction = DepositTransaction | WithdralTransaction | SalaryTransaction | CreditCardTransaction | BankFeeTransaction;

export interface Operation {
    name: OperationName;
    title: string;
}

export type OperationName = 'deposit' | 'withdral' | 'salary' | 'credit-card' | 'bank-fee';