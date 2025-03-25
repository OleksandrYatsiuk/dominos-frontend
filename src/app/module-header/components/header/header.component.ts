import { ChangeDetectionStrategy, Component, computed, Inject, Injector, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, isPlatformBrowser, NgClass, UpperCasePipe } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/module-shared/components/login/login.component';
import { ELanguage } from '@core/models/language';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from '@core/services/lang.service';
import { Store } from '@ngxs/store';
import { FetchBasketFromStorage } from '@core/basket/basket.actions';
import { BasketState } from '@core/basket/basket.state';
import { CheckAccessTokenAction, CurrentUserAction, LogoutAction } from 'src/app/module-auth/state/auth.actions';
import { AuthState } from 'src/app/module-auth/state/auth.state';
import { UserRoles } from '@core/models/user.model';
import { TranslateOptionsPipe } from '@shared/pipe/translate-options.pipe';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass, AsyncPipe,
    FormsModule, TranslateModule, RouterModule,
    SelectModule, MenuModule, RouterModule,
  ],
  providers: [DialogService],
})
export class HeaderComponent implements OnInit, OnDestroy {

  summa = this._store.selectSignal(BasketState.generalSumma);
  count = this._store.selectSignal(BasketState.generalCount);
  user = this._store.selectSignal(AuthState.current);

  userRoles = UserRoles;
  isBrowser: boolean;
  ref: DynamicDialogRef;
  lang: ELanguage = ELanguage.uk;
  languagesOpt: SelectItem[] = [
    { label: 'UK', value: ELanguage.uk },
    { label: 'EN', value: ELanguage.en },
  ];
  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private geolocation: GeolocationService,
    private _router: Router,
    private injector: Injector,
    private _ts: TranslateService,
    private _store: Store,
    private _ls: LangService,
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  isAdministrator = computed(() => this.user().role === UserRoles.Administrator);

  userActions$ = this._ts.get('settingsLabel').pipe(map(() => [
    { label: this._ts.instant('settingsLabel'), routerLink: 'auth/user-settings' },
    { label: this._ts.instant('logoutLabel'), command: () => { this.logout() } },
  ]));

  menuItems$ = this._ts.get('ageTitles.promotions').pipe(map(() => [
    { label: this._ts.instant('pageTitles.promotions'), routerLink: '/promotions' },
    { label: this._ts.instant('pageTitles.pizzas'), routerLink: '/pizzas' },
    // { label: this._ts.instant('pageTitles.drinks'), routerLink: '/drinks' },
    // { label: this._ts.instant('pageTitles.sides'), routerLink: '/' },
    // { label: this._ts.instant('pageTitles.desserts'), routerLink: '/' }
  ]));

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {
    this._store.dispatch([new CheckAccessTokenAction(), new FetchBasketFromStorage(), new CurrentUserAction()]);

    this.lang = this._ls.getLang();
    this._ts.setDefaultLang(this._ls.getLang());
    this.geolocation.askGeoLocation();
  }

  openModal(): void {
    this.ref = this.injector.get(DialogService).open(LoginComponent, { header: this._ts.instant('loginLabel') });
  }

  onChangeLang(lang: ELanguage): void {
    this._ts.use(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  logout(): void {
    this._store.dispatch(new LogoutAction()).subscribe(() => this._router.navigate(['/']));
  }
}
