import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaCreateComponent } from '../module-admin-panel/module-pizzas/containers/pizza-create/pizza-create.component';
import { PizzaOverviewResolver } from '../module-admin-panel/module-pizzas/components/pizza-overview/pizza-overview.resolver';
import { PizzaComponent } from './components/pizza/pizza.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CreatePizzaGuard } from '../module-shared/guards/createPizza.guard';

const routes: Routes = [
  {
    path: '', component: PizzaComponent,
  },
  {
    path: ':id',
    loadChildren: () => import('../module-admin-panel/module-pizzas/components/pizza-overview/pizza-overview.module').then(m => m.PizzaOverviewModule),
  }
];


@NgModule({
  declarations: [
    PizzaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    RouterModule.forChild(routes)
  ],
  providers: [CreatePizzaGuard]
})
export class PizzaModule { }