import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { CalendarModule } from 'primeng/calendar';
import { HeaderModule } from './module-header/module-header.module';
import { FooterModule } from './module-footer/module-footer.module';
import { SharedModule } from '@shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule,
    CommonModule,
    SharedModule,
    FooterModule,
    HeaderModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    CalendarModule
  ],
  exports: [SharedModule],
  providers: [BasketService, UserService, GeolocationService, ApiConfigService, DialogService, {
    provide: APP_INITIALIZER,
    useFactory: (configService: ApiConfigService) => () => configService.loadApiConfig(),
    deps: [ApiConfigService],
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
