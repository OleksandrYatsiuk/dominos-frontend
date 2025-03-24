import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GeolocationService } from './core/services/geolocation.service';
import { DialogService } from 'primeng/dynamicdialog';
import { registerLocaleData } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import uk from '@angular/common/locales/uk';
import en from '@angular/common/locales/en';
import { LangService } from '@core/services/lang.service';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { DrinksState } from './module-drinks/drinks.state';
import { PromotionsState } from './module-promotions/state/promotions.state';
import { BasketState } from '@core/basket/basket.state';
import { PizzasState } from './module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { AuthState } from './module-auth/state/auth.state';
import { environment } from '@environments/environment';
import { CoreModule } from '@core/core.module';

registerLocaleData(uk);
registerLocaleData(en);


@NgModule({
    bootstrap: [],
    providers: [
        GeolocationService, DialogService, MessageService, ConfirmationService,
        {
            provide: LOCALE_ID,
            deps: [LangService], //some service handling global settings
            useFactory: (langService: LangService) => langService.getLang() //returns locale string
        },
        LangPipe, DatePipe]
})
export class AppModule { }
