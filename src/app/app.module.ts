import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { BasketService } from './core/services/basket.service';
import { UserService } from './core/services/user.service';
import { GeolocationService } from './core/services/geolocation.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  exports: [
    SharedModule,
  ],
  providers: [BasketService, UserService, GeolocationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
