import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children:[
      {
        path: 'deliveries',
        component: DeliveryListComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'promotions',
        component: PromotionListComponent
      },
      {
        path: 'pizzas',
        component: PizzaListComponent
      },
      {
        path: 'shops',
        component: ShopListComponent
      },
    ]
  },
  

  // {
  //   path: '',
  //   component: AdminPanelComponent,
  //   children: [
  //     {
  //       path: '',
  //       children: [
  //         { path: 'shipping', component: ShippingFormComponent },
  //         { path: 'carryout', component: CarryoutComponent },
  //       ]
  //     },
  //   ]
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
