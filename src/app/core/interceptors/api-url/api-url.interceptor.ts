import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ url: this._getLink(request.url) });
    return next.handle(request);
  }

  private _isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }
  private _isIncludesI18n(url: string): boolean {
    const i18nPattern = /\/i18n\//i;
    return i18nPattern.test(url);
  }
  private _isIncludesAssets(url: string): boolean {
    const i18nPattern = /assets\//i;
    return i18nPattern.test(url);
  }

  private _isInternalLink(url: string): boolean {
    return this._isAbsoluteUrl(url) || this._isIncludesI18n(url) || this._isIncludesAssets(url);
  }

  private _getLink(url: string): string {
    return this._isInternalLink(url) ? url : `${environment.serverUrl}${url}`;
  }
}
