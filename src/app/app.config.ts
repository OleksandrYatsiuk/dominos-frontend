import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { provideStore } from '@ngxs/store';
import { PizzasState } from './module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { environment } from '@environments/environment';
import { PromotionsState } from './module-promotions/state/promotions.state';
import { AuthState } from './module-auth/state/auth.state';
import { BasketState } from '@core/basket/basket.state';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import uk from '@angular/common/locales/uk';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';


registerLocaleData(uk);
registerLocaleData(en);


const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling({ anchorScrolling: 'enabled' });

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideRouter(routes, inMemoryScrollingFeature),
    importProvidersFrom([CoreModule]),
    provideStore([PizzasState, PromotionsState, AuthState, BasketState], { developmentMode: !environment.production }),
    withNgxsLoggerPlugin(),
  ]
};
