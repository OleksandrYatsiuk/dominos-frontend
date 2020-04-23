import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const authRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  { path: 'user-settings', component: UserSettingsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }