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
        path: 'admin',
        canActivateChild: [authGuard],
        loadComponent: () => import('./components/layout/dashbord-layout/dashbord-layout.component').then(c => c.DashbordLayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/transactions/transactions.component').then(c => c.TransactionsComponent)
            }
        ]
    },
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
