import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PizzaCreateComponent } from './containers/pizza-create/pizza-create.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MultiLanguageFieldModule } from 'src/app/multi-language-field/multi-language-field.module';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaEditComponent } from './containers/pizza-edit/pizza-edit.component';
import { PizzasFormDialogComponent } from './components/pizzas-form-dialog/pizzas-form-dialog.component';

const routes: Routes = [
  { path: 'create', component: PizzaCreateComponent },
  { path: ':id', component: PizzaEditComponent }
];

@NgModule({
  declarations: [PizzaCreateComponent, PizzaFormComponent, PizzaEditComponent, PizzasFormDialogComponent],
  imports: [
    CommonModule,
    TableModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    MultiLanguageFieldModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulePizzasModule { }
