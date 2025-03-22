import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { GeolocationService } from './core/services/geolocation.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { FooterModule } from './module-footer/module-footer.module';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import { ConfirmService } from '@core/services/confirm.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import uk from '@angular/common/locales/uk';
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
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { AuthState } from './module-auth/state/auth.state';
import { HeaderComponent } from './module-header/components/header/header.component';

registerLocaleData(uk);
registerLocaleData(en);

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        // BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserModule,
        CommonModule,
        SharedModule,
        FooterModule,
        HeaderComponent,
        BrowserAnimationsModule,
        CalendarModule,
        ConfirmDialogModule,
        NgxsModule.forRoot([DrinksState, PromotionsState, BasketState, PizzasState, AuthState], {
            developmentMode: !environment.production
        }),
        CoreModule,
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
    providers: [GeolocationService, DialogService, MessageService, ConfirmService, ConfirmationService,
        {
            provide: LOCALE_ID,
            deps: [LangService], //some service handling global settings
            useFactory: (langService: LangService) => langService.getLang() //returns locale string
        },
        LangPipe, DatePipe, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
