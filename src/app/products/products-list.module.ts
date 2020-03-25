import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaCreateComponent } from './pizza/pizza-create/pizza-create.component';
import { PizzaOverviewComponent } from './pizza/pizza-overview/pizza-overview.component';
import { SharedModule } from '../shared';
import { PizzaOverviewDataService } from './pizza/pizza-overview/pizza-overview-data.service';
import { PizzaOverviewResolver } from './pizza/pizza-overview/pizza-overview.resolver';
import { MaterialModule } from '../shared/material.module';
import { PizzaItemComponent } from './pizza/pizza-item/pizza-item.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    PizzaComponent,
    PizzaCreateComponent,
    PizzaOverviewComponent,
    PizzaItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,
    SharedModule,
    CommonModule,
  ],
  exports:[
    PizzaItemComponent
  ],
  providers: [PizzaOverviewDataService, PizzaOverviewResolver]
})
export class ProductsListModule { }
