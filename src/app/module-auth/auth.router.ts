import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

export default [
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    {
        path: 'user-settings',
        component: UserSettingsComponent,
    },

] as Routes;
