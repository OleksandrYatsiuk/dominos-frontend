import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { CarryoutComponent } from './carryout/carryout.component';
import { MaterialModule } from '../shared/material.module';
import { MapComponent } from '../shared/components/map/map.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { MobilePhoneDirective } from './mobile-phone.directive';


@NgModule({
  declarations: [
    DeliveryComponent,
    ShippingFormComponent,
    CarryoutComponent,
    MobilePhoneDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule,
    MaterialModule
  ],
  entryComponents: [MapComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class DeliveryModule { }
