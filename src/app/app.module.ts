import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { BasketService } from './core/services/basket.service';
import { UserService } from './core/services/user.service';
import { GeolocationService } from './core/services/geolocation.service';
import { ApiConfigService } from './core/services/api-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { HeaderModule } from './module-header/module-header.module';
import { FooterModule } from './module-footer/module-footer.module';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import { ConfirmService } from '@core/services/confirm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import uk from '@angular/common/locales/uk';
import ru from '@angular/common/locales/ru';
import en from '@angular/common/locales/en';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ELanguage } from '@core/models/language';


registerLocaleData(uk);
registerLocaleData(ru);
registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    SharedModule,
    FooterModule,
    HeaderModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    CalendarModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      defaultLanguage: ELanguage.uk,
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [BasketService, UserService, GeolocationService, ApiConfigService, DialogService, MessageService, ConfirmService, ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ApiConfigService) => () => configService.loadApiConfig(),
      deps: [ApiConfigService],
      multi: true
    },
    { provide: LOCALE_ID, useValue: ELanguage.uk }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
