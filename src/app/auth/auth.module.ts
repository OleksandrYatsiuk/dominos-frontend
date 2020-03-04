import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
    ]
  }
];

@NgModule({

  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes),
    MatFormFieldModule,
  ],
  providers: [],
  entryComponents: []

})
export class AuthModule { }
