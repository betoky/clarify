import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

const authProvider = () => {
    const auth = getAuth();
    if (environment.runningMode === "local" && environment.emulator) {
        connectAuthEmulator(auth, environment.emulator.host + ':' + environment.emulator.authPort);
    }
    return auth;
}

const firestorePorvider = () => {
    const db = getFirestore();
    if (environment.runningMode === "local" && environment.emulator) {
        connectFirestoreEmulator(db, environment.emulator.host.replace('http://', ''), environment.emulator.firestorePort);
    }
    return db;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => authProvider()),
        provideFirestore(() => firestorePorvider()),
        provideAnimationsAsync()
    ]
};
