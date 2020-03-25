import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootService } from './services/root.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './interceptors/token.interceptor';
import { ErrorInterseptor } from './interceptors/error.interceptor';
import { BasketService } from './services/basket.service';



@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    BasketService,
    RootService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterseptor,
      multi: true
    }
  ],
})
export class CoreModule { }
