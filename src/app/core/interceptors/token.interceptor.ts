import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  private bearerToken: string | null = localStorage.getItem('auth');
  private setToken = (req) => req.clone({
    headers: req.headers.set('Authorization', `Bearer ${this.bearerToken}`)
  });


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return req.url.includes(environment.serverURL) && this.bearerToken ?
      next.handle(this.setToken(req)) : next.handle(req);
  };
}

