import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmEmailResolver } from './confirm-email.resolver';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserSettingsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ],
  entryComponents: [LoginComponent],
  providers: [
    ConfirmEmailResolver,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hasBackdrop: false, appearance: 'fill' } }],
})
export class AuthModule { }
