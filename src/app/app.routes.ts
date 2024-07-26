import { Routes } from '@angular/router';
import { loggedInGuard } from './guards/logged-in.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [loggedInGuard],
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: '',
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        loadComponent: () => import('./components/layout/authenticated-layout/authenticated-layout.component').then(c => c.AuthenticatedLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'bank',
                loadComponent: () => import('./pages/bank/bank.component').then(c => c.BankComponent)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
