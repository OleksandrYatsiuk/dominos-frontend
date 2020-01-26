import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
// import { HeaderComponent, FooterComponent } from './layout'
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    PizzaFilterPipe
  ],
  imports: [],
  exports: [
    // HeaderComponent,
    // FooterComponent,
    CommonModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
