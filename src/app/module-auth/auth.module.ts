import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmEmailResolver } from './confirm-email.resolver';

@NgModule({
    declarations: [ConfirmComponent],
    imports: [
        CommonModule, AuthRoutingModule,
    ],
    providers: [ConfirmEmailResolver]
})

export class AuthModule { }
