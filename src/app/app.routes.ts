import { Routes } from '@angular/router';
import { MainComponent } from './module-main/components/main/main.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    { path: 'auth', loadChildren: () => import('./module-auth/auth.module').then(mod => mod.AuthModule) },

];
