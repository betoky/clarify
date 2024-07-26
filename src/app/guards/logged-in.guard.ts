import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const loggedInGuard = () => {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$.pipe(
        map(isLoggedIn => {
            if (isLoggedIn) {
                // Redirect to home if logged in
                router.navigate(['/'], { replaceUrl: true });
                return false;
            }

            return true;
        })
    )
};