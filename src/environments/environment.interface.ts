import { BankFeeType, CreditCardType, WithdralType } from "../app/models/transaction";

export interface IEnvironment {
    production: boolean;
    runningMode: 'prod' | 'dev' | 'local';
    firebase: {
        projectId: string;
        appId: string;
        storageBucket: string;
        apiKey: string;
        authDomain: string;
        messagingSenderId: string;
    };
    // only for environment.local.ts file
    emulator?: {
        host: string;
        firestorePort: number;
        authPort: number;
        functionPort: number;
    },
    // only for environment.local.ts file
    fakeDataEngine?: {
        transactions: {
            "bank-fee": {
                types: [BankFeeType, BankFeeType];
                charges: {
                    'CARD': number;
                    'AGIOS': number[];
                }
            },
            "credit-card": {
                types: [CreditCardType, CreditCardType];
                amounts: number[];
            },
            "deposit": {
                agencies: string[];
                amounts: number[];
            },
            "salary": {
                amount: number;
                company: string;
            },
            "withdral": {
                types: [WithdralType, WithdralType];
                locations: string[];
                amounts: number[];
            }
        }
    }
}