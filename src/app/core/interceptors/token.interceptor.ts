import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { concatMap, Observable, take } from 'rxjs';
import { UserService } from '../services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/module-auth/state/auth.state';
import { AuthResponse } from 'src/app/module-auth/auth.model';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  isBrowser: boolean;

  @Select(AuthState.credentials) credentials$: Observable<AuthResponse>;

  constructor(private user: UserService, @Inject(PLATFORM_ID) private _pid: any) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.credentials$.pipe(
      take(1),
      concatMap(({ token }) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              authorization: `Bearer ${token}`,
            }
          });
        }
        return next.handle(request);
      }))
  }
}

