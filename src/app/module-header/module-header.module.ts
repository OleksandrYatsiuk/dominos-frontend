import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from '@core/users/users/users.state';
import { AuthState } from '../module-auth/state/auth.state';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    SharedModule,
    TranslateModule,
    DropdownModule,
    NgxsModule.forFeature([UsersState, AuthState])
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
