import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmEmailResolver } from './confirm-email.resolver';

@NgModule({
  declarations: [
    RegistrationComponent,
    UserSettingsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  entryComponents: [],
  providers: [
    ConfirmEmailResolver,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hasBackdrop: false, appearance: 'fill' } }],
})
export class AuthModule { }
