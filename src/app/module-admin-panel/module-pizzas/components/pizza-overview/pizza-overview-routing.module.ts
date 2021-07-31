import { NgModule } from '@angular/core';
import { PizzaOverviewComponent } from './pizza-overview.component';
import { PizzaOverviewResolver } from './pizza-overview.resolver';
import { Routes, RouterModule } from '@angular/router';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';

const routes: Routes = [

  {
    path: '',
    component: PizzaOverviewComponent,
    resolve: { pizza: PizzaOverviewResolver }
  },
  {
    path: 'edit', component: PizzaEditComponent,
    resolve: { pizza: PizzaOverviewResolver }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  providers: [PizzaOverviewResolver]
})
export class PizzaOverviewRoutingModule { }
