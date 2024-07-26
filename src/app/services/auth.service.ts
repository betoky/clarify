import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, User, user, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { filter, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private authenticated$: Observable<User | null | undefined> = user(this.auth);

    isLoggedIn$ = this.authenticated$.pipe(filter(user => user !== undefined), map(user => user !== null));
    currentUser = toSignal(this.authenticated$.pipe(map(user => user ? user.providerData : null)), { initialValue: null });

    loginWithEmail(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    loginWithGoogle() {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(this.auth, googleProvider)
    }

    logout() {
        return signOut(this.auth);
    }
}
