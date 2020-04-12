import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaComponent } from './pizza.component';
import { PizzaOverviewComponent } from './pizza-overview/pizza-overview.component';
import { PizzaOverviewResolver } from './pizza-overview/pizza-overview.resolver';
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
    path: ':id', component: PizzaOverviewComponent,
    resolve: { pizza: PizzaOverviewResolver }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [CreatePizzaGuard],
  exports: [RouterModule]

})
export class PizzaRoutingModule { }
