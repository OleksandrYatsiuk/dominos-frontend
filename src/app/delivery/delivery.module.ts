import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { CarryoutComponent } from './carryout/carryout.component';


@NgModule({
  declarations: [
    DeliveryComponent,
    ShippingFormComponent,
    CarryoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule
  ],
  providers: []
})
export class DeliveryModule { }
