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
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({

  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    UserSettingsComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  exports: [],
  entryComponents: []
})
export class AuthModule { }
