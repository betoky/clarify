import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    production: false,
    runningMode: "local",
    firebase: {
        projectId: "PROJECT_ID",
        appId: "APP_ID",
        storageBucket: "PROJECT_ID.appspot.com",
        apiKey: "API_KEY",
        authDomain: "PROJECT_ID.firebaseapp.com",
        messagingSenderId: "SENDER_ID"
    },
    // add only inside of environment.local.ts
    emulator: {
        host: "http://127.0.0.1",
        firestorePort: 8080,
        authPort: 9099
    },
    fakeDataEngine: {
        transactions: {
            "bank-fee": {
                types: ['AGIOS', 'CARD'],
                charges: {
                    'CARD': 27500,
                    'AGIOS': [1500, 2000, 3000, 6000]
                }
            },
            "credit-card": {
                types: ['TPE', 'VISA'],
                amounts: [20000, 50000, 100000, 150000, 200000, 250000, 300000]
            },
            "deposit": {
                agencies: ['Anstakaviro', 'Analakely', 'Antanimena', 'Ambatondrazaka', 'Fianarantsoa'],
                amounts: [200000, 500000, 800000, 1200000, 2300000, 3000000]
            },
            "salary": {
                amount: 4500000,
                company: "Nom de la société"
            },
            "withdral": {
                types: ["check", "gab"],
                locations: ['BOA Andrefana Ambohijanahary', 'BNI Analakely', 'BOA Analakely', 'SG Analakely', 'BNI Anstakaviro', 'SG Anstakaviro'],
                amounts: [50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000]
            }
        }
    }
};
