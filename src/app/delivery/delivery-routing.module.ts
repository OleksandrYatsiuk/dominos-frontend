import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { DeliveryComponent } from './delivery.component';
import { CarryoutComponent } from './carryout/carryout.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';


const deliveryRoutes: Routes = [
  {
    path: '',
    component: DeliveryComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'shipping', component: ShippingFormComponent },
          { path: 'carryout', component: CarryoutComponent },
        ]
      },
    ]
  },
  {
    path: "deliveries",
    component: DeliveryListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(deliveryRoutes)
  ],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }

