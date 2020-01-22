import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PizzaFilterPipe } from './pizza-filter.pipe';


@NgModule({
  declarations: [PizzaFilterPipe],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [NgbModule]
})
export class SharedModule { }
