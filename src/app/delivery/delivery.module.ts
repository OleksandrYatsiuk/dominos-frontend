import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { CarryoutComponent } from './components/carryout/carryout.component';
import { SharedModule } from '@shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    DeliveryComponent,
    ShippingFormComponent,
    CarryoutComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule,
    CalendarModule
  ],
  providers: []
})
export class DeliveryModule { }
