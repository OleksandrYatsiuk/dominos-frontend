import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    SharedModule,
    TranslateModule,
    DropdownModule,
    // NgxsModule.forFeature([UsersState, AuthState])
  ],
})
export class HeaderModule { }
