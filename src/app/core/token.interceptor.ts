import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('https://my-dominos.herokuapp.com/pizza')) {
      const paramReq = req.clone({
        params: req.params.set('userId', '7')
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }
  }
}

