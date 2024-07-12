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
    }
};
