import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ELanguage } from '@core/models/language';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private _lang: ELanguage.uk
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private _pid
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  initLang(lang: ELanguage): void {
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
    }
  }

  getLang(): ELanguage {
    if (this.isBrowser) {
      return localStorage.getItem('lang') as ELanguage || ELanguage.uk;
    }
  }
}
