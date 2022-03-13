import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LangService } from '@core/services/lang.service';
import { environment } from '@environments/environment';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes(environment.serverUrl)) {
      const _ls: LangService = this._injector.get(LangService);
      request = request.clone({
        setHeaders: {
          'lang': _ls.getLang()
        },
      });
    }

    return next.handle(request);
  }
}
