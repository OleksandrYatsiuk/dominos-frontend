import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOverviewComponent } from './pizza-overview.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaOverviewRoutingModule } from './pizza-overview-routing.module';
import { PizzaDataService } from '../../../../core/services/pizza-data.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [PizzaOverviewComponent, PizzaEditComponent],
  imports: [
    CommonModule,
    PizzaOverviewRoutingModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxPermissionsModule
  ],
  providers: [PizzaDataService]
})
export class PizzaOverviewModule { }
