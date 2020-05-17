import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOverviewComponent } from './pizza-overview.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaOverviewRoutingModule } from './pizza-overview-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared';
import { PizzaDataService } from '../pizza-data.service';



@NgModule({
  declarations: [PizzaOverviewComponent, PizzaEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PizzaOverviewRoutingModule,
    SharedModule
  ],
  providers: [PizzaDataService, PizzaOverviewModule]
})
export class PizzaOverviewModule { }
