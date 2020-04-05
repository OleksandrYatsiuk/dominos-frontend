import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootService } from './services/root.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BasketService } from './services/basket.service';
import { UserService } from './services/user.service';
import { GeolocationService } from './services/geolocation.service';
import { NotificationService } from './services/notification.service';



@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    BasketService,
    UserService,
    RootService,
    NotificationService,
    GeolocationService,
    // ErrorHeadlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
