import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHeadlerService } from '../services/errorHeadler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private handle: ErrorHeadlerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError(({ error }: HttpErrorResponse) => {
          if (error.code === 422) {
            this.handle.hasError(error.result)
          }
          return throwError(error);
        })
      )
  }


}
