import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOverviewDataService } from './pizza-overview-data.service';
import { PizzaOverviewComponent } from './pizza-overview.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaOverviewRoutingModule } from './pizza-overview-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [PizzaOverviewComponent, PizzaEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PizzaOverviewRoutingModule,
    SharedModule
  ],
  providers: [PizzaOverviewDataService, PizzaOverviewModule]
})
export class PizzaOverviewModule { }
