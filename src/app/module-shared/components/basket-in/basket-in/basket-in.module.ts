import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketInComponent } from './basket-in.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [BasketInComponent],
  imports: [CommonModule, TranslateModule],
  exports: [BasketInComponent]
})
export class BasketInModule { }
