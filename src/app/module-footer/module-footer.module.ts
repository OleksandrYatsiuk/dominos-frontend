import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxPermissionsModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
