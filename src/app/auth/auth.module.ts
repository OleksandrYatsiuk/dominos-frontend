import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmEmailResolver } from './confirm-email.resolver';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent,
    UserSettingsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  entryComponents: [],
  providers: [ConfirmEmailResolver]
})

export class AuthModule { }
