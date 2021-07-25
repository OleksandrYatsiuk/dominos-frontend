import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { MainComponent } from './main/main.component';
import { PizzaModule } from './pizza/pizza.module';
import { SharedModule } from '@shared/shared.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductsListComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    PizzaModule,
    SwiperModule,
    ProductsRoutingModule,
    SharedModule
  ],
})
export class ProductsListModule { }
