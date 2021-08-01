import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PizzaCreateComponent } from './components/pizza-create/pizza-create.component';
import { CreatePizzaGuard } from 'src/app/module-shared/guards/createPizza.guard';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
  { path: 'create', component: PizzaCreateComponent, canActivate: [CreatePizzaGuard] },
  {
    path: ':id',
    loadChildren: () => import('./components/pizza-overview/pizza-overview.module').then(m => m.PizzaOverviewModule),
  }
];

@NgModule({
  declarations: [PizzaCreateComponent],
  imports: [
    CommonModule,
    TableModule,
    SharedModule,
    MultiSelectModule,
    DropdownModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulePizzasModule { }
