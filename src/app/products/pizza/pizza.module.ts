import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaOverviewResolver } from './pizza-overview/pizza-overview.resolver';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaComponent } from './pizza.component';
import { PizzaDataService } from './pizza-data.service';



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
  providers: [PizzaDataService, PizzaOverviewResolver]
})
export class PizzaModule { }
