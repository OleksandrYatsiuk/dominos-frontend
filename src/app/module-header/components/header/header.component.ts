import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/module-shared/components/login/login.component';
import { ELanguage } from '@core/models/language';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '@core/services/lang.service';
import { Select, Store } from '@ngxs/store';
import { FetchBasketFromStorage } from '@core/basket/basket.actions';
import { BasketState } from '@core/basket/basket.state';
import { CheckAccessTokenAction, CurrentUserAction, LogoutAction } from 'src/app/module-auth/state/auth.actions';
import { AuthResponse, User } from 'src/app/module-auth/auth.model';
import { AuthState } from 'src/app/module-auth/state/auth.state';
import { UserRoles } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Select(BasketState.generalSumma) summa$: Observable<string>;
  @Select(BasketState.generalCount) count$: Observable<number>;
  @Select(AuthState.current) user$: Observable<User>;
  @Select(AuthState.credentials) credentials$: Observable<AuthResponse>;

  userRoles = UserRoles;
  isBrowser: boolean;
  items: MenuItem[] = [];
  pagesItems: MenuItem[];
  ref: DynamicDialogRef;
  lang: ELanguage = ELanguage.uk;
  languagesOpt: SelectItem[] = [
    { label: 'UK', value: ELanguage.uk },
    { label: 'RU', value: ELanguage.ru },
    { label: 'EN', value: ELanguage.en },
  ];
  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private geolocation: GeolocationService,
    private _router: Router,
    private _ds: DialogService,
    private _ts: TranslateService,
    private _store: Store,
    private _ls: LangService,
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }
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

    this.items = [
      { label: 'settingsLabel', routerLink: 'auth/user-settings' },
      { label: 'logoutLabel', command: () => { this.logout() } },
    ];


    this.pagesItems = [
      { label: this._ts.instant('pageTitles.promotions'), routerLink: '/promotion' },
      { label: this._ts.instant('pageTitles.pizzas'), routerLink: '/pizza' },
      { label: this._ts.instant('pageTitles.drinks'), routerLink: '/drinks' },
      { label: this._ts.instant('pageTitles.sides'), routerLink: '/' },
      { label: this._ts.instant('pageTitles.desserts'), routerLink: '/' }
    ];
  }
  openModal(): void {
    this.ref = this._ds.open(LoginComponent, { styleClass: 'd-dialog', header: this._ts.instant('loginLabel') });
  }

  onChangeLang(lang: ELanguage): void {
    this._ts.use(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  logout(): void {
    this._store.dispatch(new LogoutAction())
      .subscribe(() => this._router.navigate(['/']));
  }
}
