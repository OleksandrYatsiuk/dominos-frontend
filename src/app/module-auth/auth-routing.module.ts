import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ConfirmEmailResolver } from './confirm-email.resolver';

const authRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  { path: 'user-settings', component: UserSettingsComponent },
  // {
  //   path: 'confirm/:hash', component: ConfirmComponent,
  //   resolve: { hash: ConfirmEmailResolver }
  // },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
  providers: [ConfirmEmailResolver]
})
export class AuthRoutingModule { }
