import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { SharedModule } from '../shared';
import { MainComponent } from './main/main.component';
import { PizzaModule } from './pizza/pizza.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    PizzaModule,
    ProductsRoutingModule,
    SharedModule
  ],
})
export class ProductsListModule { }
