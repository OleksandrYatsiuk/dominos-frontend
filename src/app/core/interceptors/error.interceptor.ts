import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/errorHandler.service';
import { HttpStatusCode } from '../models/http-status-code';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngxs/store';
import { LogoutAction } from 'src/app/module-auth/state/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isBrowser: boolean;

  constructor(
    private handler: ErrorHandlerService, @Inject(PLATFORM_ID) private _pid: any, private store: Store) {
    this.isBrowser = isPlatformBrowser(_pid);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError(({ error }: HttpErrorResponse) => {
          if (error?.statusCode === HttpStatusCode.UnprocessableEntity) {
            this.handler.hasError(error.result);
          }
          if (error?.statusCode === HttpStatusCode.Unauthorized) {
            // this.store.dispatch(new LogoutAction());
          }
          return throwError(error);
        })
      );
  }


}
