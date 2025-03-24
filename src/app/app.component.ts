import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ELanguage } from '@core/models/language';
import { LangService } from '@core/services/lang.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { HeaderComponent } from './module-header/components/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FooterComponent } from './module-footer/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, RouterModule, RouterOutlet, ConfirmDialogModule, ToastModule, FooterComponent]
})

export class AppComponent implements OnInit {
  isBrowser: boolean;
  language: ELanguage = ELanguage.uk;
  constructor(
    @Inject(PLATFORM_ID) private _pid,
    @Inject(PrimeNG) readonly primeNG: PrimeNG,
    private _ts: TranslateService,
    private _cd: ChangeDetectorRef,
    private _ls: LangService,
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  ngOnInit(): void {
    this.primeNG.ripple.set(true);
    this._ls.initLang(this._ls.getLang());
    this._ts.setDefaultLang(this._ls.getLang() || ELanguage.uk);

    if (this.isBrowser) {
      const lang = localStorage.getItem('lang') as ELanguage;
      if (lang) {
        this.language = lang;
      }
    }

    this._ts.get('primeng')
      .subscribe(res => {
        this.primeNG.setTranslation(res);
        this._cd.detectChanges();
      });

  }
}
