import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import ru from '@angular/common/locales/ru';
import { ConfirmService } from '@core/services/confirm.service';
import { ConfirmationService } from 'primeng/api';

registerLocaleData(uk);
registerLocaleData(ru);

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
    CalendarModule,
    ConfirmDialogModule,

  ],
  exports: [SharedModule],
  providers: [BasketService, UserService, GeolocationService, ApiConfigService, DialogService, ConfirmService, ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ApiConfigService) => () => configService.loadApiConfig(),
      deps: [ApiConfigService],
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'uk' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
