import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ELanguage } from '@core/models/language';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  title = 'Dominos';
  isBrowser: boolean;
  language: ELanguage = ELanguage.uk;
  constructor(
    @Inject(PLATFORM_ID) private _pid,
    private _ts: TranslateService,
    private _cd: ChangeDetectorRef,
    private _config: PrimeNGConfig
  ) {
    this.isBrowser = isPlatformBrowser(_pid);


  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const lang = localStorage.getItem('lang') as ELanguage;
      if (lang) {
        this.language = lang;
      }
    }
    this._ts.setDefaultLang(this.language);

    this._ts.get('primeng')
      .subscribe(res => {
        this._config.setTranslation(res);
        this._cd.detectChanges();
      });

  }
}
