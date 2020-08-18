import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

  constructor(private user: UserService) { }

  private bearerToken: string | null = localStorage.getItem('auth');
  private setToken = (request: HttpRequest<any>) => request.clone({
    headers: request.headers.set('Authorization', `Bearer ${this.bearerToken}`)
  })

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!/^(http|https):/i.test(request.url)) {
      const headers: { [key: string]: string } = {};
      const token = this.user.authData();

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      request = request.clone({
        url: `${environment.serverUrl}${request.url.replace(/^\/+/, '')}`,
        setHeaders: headers,
      });
    }
    return next.handle(request);
  }
}

