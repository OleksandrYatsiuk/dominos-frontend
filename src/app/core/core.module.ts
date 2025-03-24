import { NgModule, SkipSelf, Optional, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParamInterceptor, ErrorInterceptor } from './interceptors';
import { LangInterceptor } from './interceptors/lang.interceptor';
import { ApiUrlInterceptor } from './interceptors/api-url/api-url.interceptor';
import { provideStore } from '@ngxs/store';
import { PizzasState } from '../module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { BasketState } from './basket/basket.state';
import { AuthState } from '../module-auth/state/auth.state';
import { environment } from '@environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmService } from './services/confirm.service';
import { PromotionsState } from '../module-promotions/state/promotions.state';
import { LangService } from './services/lang.service';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, '/i18n/', '.json');

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true
    },
    MessageService, ConfirmService, ConfirmationService,
    {
      provide: LOCALE_ID,
      deps: [LangService],
      useFactory: (langService: LangService) => langService.getLang(),
    },
    provideStore([PizzasState, PromotionsState, BasketState, AuthState], { developmentMode: !environment.production })
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
