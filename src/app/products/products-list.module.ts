import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-list-routing.module';
import { ProductsListComponent } from './products-list.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaCreateComponent } from './pizza/pizza-create/pizza-create.component';
import { PizzaOverviewComponent } from './pizza/pizza-overview/pizza-overview.component';
import { SharedModule } from '../shared';
import { MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { PizzaOverviewDataService } from './pizza/pizza-overview/pizza-overview-data.service';
import { PizzaOverviewResolver } from './pizza/pizza-overview/pizza-overview.resolver';

@NgModule({
  declarations: [
    ProductsListComponent,
    PizzaComponent,
    PizzaCreateComponent,
    PizzaOverviewComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [PizzaOverviewDataService, PizzaOverviewResolver]
})
export class ProductsListModule { }
