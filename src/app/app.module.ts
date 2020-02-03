import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { ShippingFormComponent } from './delivery/shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    ShippingFormComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
