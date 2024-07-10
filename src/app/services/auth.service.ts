import { computed, effect, inject, Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    authenticated = toSignal<User | null>(user(this.auth));
    loadForAuthenticatedUser = computed(() => this.authenticated() === undefined);

    constructor(private router: Router) {
        
        effect(() => {
            if (this.authenticated() !== undefined) {
                !this.authenticated()
                    ? this.router.navigate(['/login'])
                    : this.router.navigate(['/dashboard'], {replaceUrl: true});
            }
        })
    }

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
