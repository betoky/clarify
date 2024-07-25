import { inject, Injectable } from "@angular/core";
import { BankFeeTransaction, BankFeeType, CreditCardTransaction, CreditCardType, DepositTransaction, OperationName, SalaryTransaction, Transaction, WithdralTransaction, WithdralType } from "../models/transaction";
import { randomInteger } from "../helpers/number";
import { randomDate } from "../helpers/date";
import { TransactionsService } from "./transactions.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DummyService {
    private transactionService = inject(TransactionsService);

    generateTransactions(iteration: number) {
        if (environment.runningMode !== 'local') {
            throw new Error('Expected "local" running mode; "' + environment.runningMode + '" found');
        }
        if (!environment.fakeDataEngine) {
            throw new Error('"fakeDataEngine" not found, it is required in environment.local.ts file');
        }

        const operations: OperationName[] = ["bank-fee", "credit-card", "deposit", "salary", "withdral"];
        const result = [];

        while (iteration > 0) {
            const operation = operations.at(randomInteger(operations.length - 1))!;
            const [date, updated_at] = this.getDates(Math.floor(Math.random() * 6));
            const type = this.getType(operation);
            const amount = this.getAmount(operation, type);
    
            const transaction = this.generateTransaction(operation, amount, date, date, updated_at, type);
            result.push(this.transactionService.save(transaction));
            iteration--;
        }
        return Promise.all(result);
    }

    private getType(operation: OperationName): BankFeeType | CreditCardType | WithdralType | undefined {
        if (operation === 'salary' || operation === 'deposit') {
            return undefined;
        }
        const types = environment.fakeDataEngine!.transactions[operation].types;
        
        return types[Math.floor(Math.random() * Math.floor(2))]
    }

    private getAmount = (operation: OperationName, type?: BankFeeType | CreditCardType | WithdralType) => {
        if (operation === 'salary') {
            return environment.fakeDataEngine!.transactions.salary.amount;
        }
        if (operation === 'bank-fee') {
            if (!type) {
                throw new Error('Type of bank-fee operation must define');
            }
            if (!(type === 'AGIOS' || type === 'CARD')) {
                throw new Error('Incompatible operation type of bank-fee with ' + type);
            }
            const {AGIOS, CARD} = environment.fakeDataEngine!.transactions["bank-fee"].charges;
            return type === 'AGIOS' ? AGIOS.at(randomInteger(AGIOS.length-1))! : CARD;
        }

        const amounts = environment.fakeDataEngine!.transactions[operation].amounts;
        const randomIndex = randomInteger(amounts.length - 1);
        return amounts.at(randomIndex)!;
    }

    private getDates = (index: number): [Date, Date | null] => {
        const date = randomDate(new Date('01/01/2014'), new Date());
        const next5 = new Date(date);
        next5.setDate(next5.getDate() + 5);
        const updated_at = (index % 2 === 0) ? randomDate(date, next5) : null;
        return [date, updated_at];
    }

    private generateTransaction = (
        operation: OperationName,
        amount: number,
        date: Date,
        created_at: Date,
        updated_at: Date | null,
        type?: BankFeeType | CreditCardType | WithdralType
    ): Omit<Transaction, 'id'> => {

        switch (operation) {
            case "bank-fee":
                if (!type) {
                    throw new Error('Type of bank-fee operation must define');
                }
                if (!(type === 'AGIOS' || type === 'CARD')) {
                    throw new Error('Incompatible operation type of bank-fee with ' + type);
                }
                const bfT: Omit<BankFeeTransaction, 'id'> = {
                    operation, amount, date, created_at, updated_at, incoming: false, type, note: null
                }
                return bfT;

            case "credit-card":
                if (!type) {
                    throw new Error('Type of credit-card operation must define');
                }
                if (!(type === 'TPE' || type === 'VISA')) {
                    throw new Error('Incompatible operation type of credit-card with ' + type);
                }
                const ccT: Omit<CreditCardTransaction, 'id'> = {
                    operation, amount, date, created_at, updated_at, incoming: false, type, note: null, fee: null
                }
                return ccT;

            case "deposit":
                const agencies = environment.fakeDataEngine!.transactions.deposit.agencies;
                const dpT: Omit<DepositTransaction, 'id'> = {
                    operation, amount, date, created_at, updated_at, incoming: true, agency: agencies.at(randomInteger(agencies.length - 1))!, note: null
                }
                return dpT;

            case "salary":
                const saT: Omit<SalaryTransaction, 'id'> = {
                    operation, amount, date, created_at, updated_at, incoming: true, note: null, company: environment.fakeDataEngine!.transactions.salary.company
                }
                return saT;

            case "withdral":
                if (!type) {
                    throw new Error('Type of withdral operation must define');
                }
                if (!(type === 'gab' || type === 'check')) {
                    throw new Error('Incompatible operation type of withdral with ' + type);
                }
                const locations = environment.fakeDataEngine!.transactions.withdral.locations;
                const wiT: Omit<WithdralTransaction, 'id'> = {
                    operation, amount, date, created_at, updated_at, incoming: false, location: locations.at(randomInteger(locations.length-1))!, spent: 0, type, note: null
                }
                return wiT;
        }
    }
}