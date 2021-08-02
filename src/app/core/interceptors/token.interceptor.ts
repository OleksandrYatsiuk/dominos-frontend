import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  isBrowser: boolean;

  constructor(private user: UserService, @Inject(PLATFORM_ID) private _pid: any) {
    this.isBrowser = isPlatformBrowser(_pid);
  }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.serverUrl)) {
      const token = this.user.authData();

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}

