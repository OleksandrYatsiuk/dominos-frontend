import { Routes } from '@angular/router';
import { MainComponent } from './module-main/components/main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'auth',
        loadChildren: () => import('./module-auth/auth.router'),
    },
    {
        path: 'admin',
        loadChildren: () => import('./module-admin-panel/admin.router'),
    },
    {
        path: 'pizzas',
        loadChildren: () => import('./module-pizzas/pizzas.router'),
    },
    {
        path: 'promotions',
        loadChildren: () => import('./module-promotions/promotions.router'),
    },
];
