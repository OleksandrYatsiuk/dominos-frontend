import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaCreateComponent } from './pizza/pizza-create/pizza-create.component';
import { ProductsListComponent } from './products-list.component';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzaOverviewComponent } from './pizza/pizza-overview/pizza-overview.component';
import { PizzaOverviewResolver } from './pizza/pizza-overview/pizza-overview.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    children: [
      {
        path: 'pizza', component: PizzaComponent,
        children: [
          { path: 'create', component: PizzaCreateComponent },
          {
            path: ':id', component: PizzaOverviewComponent,
            resolve: { pizza: PizzaOverviewResolver }
          }
        ]
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ProductsRoutingModule { }
