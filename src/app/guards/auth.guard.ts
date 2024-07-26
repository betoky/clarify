import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);

    return inject(AuthService).isLoggedIn$.pipe(
        map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            }

            router.navigate(['/login'], { queryParams: { q: state.url } });
            return false;
        })
    )
};