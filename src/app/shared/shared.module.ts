import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { PizzaItemComponent } from './components/pizza-item/pizza-item.component';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule } from '@angular/common/http';
import { ModalContentComponent } from './components/modal-conponent/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PizzaItemComponent,
    HeaderComponent,
    FooterComponent,
    PizzaFilterPipe,
    ModalContentComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    NgbModule,
    ModalContentComponent,
    PizzaItemComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  entryComponents: [ModalContentComponent]

})
export class SharedModule { }
