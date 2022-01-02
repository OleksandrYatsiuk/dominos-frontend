import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
