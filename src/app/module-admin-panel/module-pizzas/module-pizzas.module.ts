import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PizzaCreateComponent } from './components/pizza-create/pizza-create.component';
import { CreatePizzaGuard } from 'src/app/module-shared/guards/createPizza.guard';


const routes: Routes = [

  { path: 'create', component: PizzaCreateComponent, canActivate: [CreatePizzaGuard] },
  {
    path: ':id',
    loadChildren: () => import('./components/pizza-overview/pizza-overview.module').then(m => m.PizzaOverviewModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModulePizzasModule { }
