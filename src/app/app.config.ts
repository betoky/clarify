import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from "@angular/fire/functions";

import { routes } from './app.routes';
import { environment } from '../environments/environment';

registerLocaleData(localeFr);

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

const functionProvider = () => {
    const functions = getFunctions();
    if (environment.runningMode === "local" && environment.emulator) {
        connectFunctionsEmulator(functions, environment.emulator.host.replace('http://', ''), environment.emulator.functionPort);
    }
    return functions;
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => authProvider()),
        provideFirestore(() => firestorePorvider()),
        provideFunctions(() => functionProvider()),
        provideAnimationsAsync(),
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'fr-FR' }
    ]
};
