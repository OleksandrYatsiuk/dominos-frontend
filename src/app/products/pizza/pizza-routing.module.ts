import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaComponent } from './pizza.component';
import { MainComponent } from '../main/main.component';
import { CreatePizzaGuard } from 'src/app/core/guards/createPizza.guard';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'pizza', component: PizzaComponent,
  },
  { path: 'create', component: PizzaCreateComponent, canActivate: [CreatePizzaGuard] },
  {
    path: ':id',
    loadChildren: () => import('./pizza-overview/pizza-overview.module').then(m => m.PizzaOverviewModule),
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [CreatePizzaGuard],
  exports: [RouterModule]

})
export class PizzaRoutingModule { }
