import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';

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
    MaterialModule,
    SharedModule
  ],
  providers: [],
  exports: [],
})
export class AuthModule { }
