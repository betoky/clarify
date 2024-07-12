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
    emulator?: {
        host: string;
        firestorePort: number;
        authPort: number;
    }
}