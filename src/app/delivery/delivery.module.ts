import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    DeliveryComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DeliveryComponent}
    ])
  ]
})
export class DeliveryModule { }
