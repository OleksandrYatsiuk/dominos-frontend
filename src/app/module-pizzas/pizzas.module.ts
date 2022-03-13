import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaComponent } from './components/pizza/pizza.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PizzaComponent },
  { path: ':id', loadChildren: () => import('../module-admin-panel/module-pizzas/components/pizza-overview/pizza-overview.module').then(m => m.PizzaOverviewModule) },
];


@NgModule({
  declarations: [PizzaComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class PizzaModule { }
