import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaComponent } from './pizza.component';
import { PizzaOverviewComponent } from './pizza-overview/pizza-overview.component';
import { PizzaOverviewResolver } from './pizza-overview/pizza-overview.resolver';
import { DeliveryGuard } from '../../core/guards/delivery.guard';
import { MainComponent } from '../main/main.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'pizza', component: PizzaComponent,
  },
  { path: 'create', component: PizzaCreateComponent, canActivate: [DeliveryGuard] },
  {
    path: ':id', component: PizzaOverviewComponent,
    resolve: { pizza: PizzaOverviewResolver }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [DeliveryGuard],
  exports: [RouterModule]

})
export class PizzaRoutingModule { }
