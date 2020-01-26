import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { ContentComponent } from './main/content/content.component';
import { PizzaItemComponent } from './main/content/pizza-item/pizza-item.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ShippingFormComponent } from './delivery/shipping-form/shipping-form.component';
import { HeaderComponent, FooterComponent } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    CreatePizzaComponent,
    HeaderComponent,
    FooterComponent,
    PizzaItemComponent,
    ContentComponent,
    ShippingFormComponent,
    MainComponent,
    DeliveryComponent,
  ],
  imports: [
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
