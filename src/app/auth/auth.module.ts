import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'user-settings', component: UserSettingsComponent },
    ]
  }
];

@NgModule({

  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes),
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [],
  entryComponents: []

})
export class AuthModule { }
