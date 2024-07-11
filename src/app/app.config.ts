import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
            const auth = getAuth();
            connectAuthEmulator(auth, environment.emulatorHost + ':' + environment.authEmulatorPort);
            return auth;
        }),
        provideFirestore(() => {
            const db = getFirestore();
            connectFirestoreEmulator(db, environment.emulatorHost, environment.firestoreEmulatorPort);
            return db;
        }),
        provideAnimationsAsync()
    ]
};
