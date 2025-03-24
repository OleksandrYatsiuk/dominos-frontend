import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
  ]
})
export class ModulePizzasModule { }
