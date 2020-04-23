import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule
  ],
  entryComponents: [LoginComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hasBackdrop: false, appearance: 'fill' } }],
})
export class AuthModule { }
