import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootService } from './services/root.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './services/notification.service';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { ParamInterceptor, ErrorInterceptor } from './interceptors';



@NgModule({
  declarations: [MobilePhoneDirective],
  imports: [CommonModule],
  providers: [
    RootService,
    NotificationService,
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
  exports: [MobilePhoneDirective]
})
export class CoreModule { }
