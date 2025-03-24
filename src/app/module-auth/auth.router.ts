import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

export default [
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    {
        path: 'user-settings',
        loadComponent: () => import('./user-settings/user-settings.component'),
    },
    {
        path: 'confirm/:hash',
        loadComponent: () => import('./confirm/confirm.component'),
    },
] as Routes;
