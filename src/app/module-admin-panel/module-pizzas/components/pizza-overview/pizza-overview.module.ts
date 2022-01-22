import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOverviewComponent } from './pizza-overview.component';
import { PizzaOverviewRoutingModule } from './pizza-overview-routing.module';
import { PizzaDataService } from '../../../../core/services/pizza-data.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { MultiLanguageFieldModule } from 'src/app/multi-language-field/multi-language-field.module';


@NgModule({
  declarations: [PizzaOverviewComponent],
  imports: [
    CommonModule,
    PizzaOverviewRoutingModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MultiLanguageFieldModule
  ],
  providers: [PizzaDataService]
})
export class PizzaOverviewModule { }
