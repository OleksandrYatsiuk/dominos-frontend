import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ApiConfigService } from './core/services/api-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule
  ],
  exports: [
    SharedModule,
  ],
  providers: [BasketService, UserService, GeolocationService, ApiConfigService, {
    provide: APP_INITIALIZER,
    useFactory: (configService: ApiConfigService) => () => configService.loadApiConfig(),
    deps: [ApiConfigService],
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
