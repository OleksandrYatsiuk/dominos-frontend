import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaOverviewResolver } from './pizza-overview/pizza-overview.resolver';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaComponent } from './pizza.component';
import { PizzaDataService } from './pizza-data.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    PizzaCreateComponent,
    PizzaComponent,
  ],
  imports: [
    CommonModule,
    PizzaRoutingModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule
  ],
  providers: [PizzaDataService, PizzaOverviewResolver]
})
export class PizzaModule { }
