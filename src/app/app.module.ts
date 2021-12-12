import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
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
import { LangService } from '@core/services/lang.service';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@environments/environment';
import { DrinksState } from './module-drinks/drinks.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { PromotionsState } from './module-promotions/promotions/promotions.state';
import { BasketState } from '@core/basket/basket.state';
import { PizzasState } from './module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { InlineSVGModule } from 'ng-inline-svg';
import { LangPipe } from '@shared/pipe/lang.pipe';

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
    NgxsModule.forRoot([DrinksState, PromotionsState, BasketState, PizzasState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    InlineSVGModule.forRoot({
      baseUrl: '/assets/icons/',
      bypassHttpClientInterceptorChain: true,
      clientOnly: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [GeolocationService, ApiConfigService, DialogService, MessageService, ConfirmService, ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ApiConfigService) => () => configService.loadApiConfig(),
      deps: [ApiConfigService],
      multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [LangService],      //some service handling global settings
      useFactory: (langService: LangService) => langService.getLang()  //returns locale string
    },
    LangPipe, DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
