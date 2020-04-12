import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaOverviewResolver } from './pizza-overview/pizza-overview.resolver';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaOverviewDataService } from './pizza-overview/pizza-overview-data.service';
import { PizzaComponent } from './pizza.component';



@NgModule({
  declarations: [
    PizzaCreateComponent,
    PizzaItemComponent,
    PizzaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PizzaRoutingModule,
    SharedModule
  ],
  exports: [
    PizzaItemComponent
  ],
  providers: [PizzaOverviewDataService, PizzaOverviewResolver]
})
export class PizzaModule { }
