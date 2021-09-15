import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { UserService } from 'src/app/core/services/user.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { Router } from '@angular/router';
import { CAN_MANAGE_PIZZA } from './header-permissions';
import { UserDataService } from 'src/app/module-auth/user-data.service';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import { MenuItem, SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/module-shared/components/login/login.component';
import { ELanguage } from '@core/models/language';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '@core/services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  basket$: Observable<any>;
  currentUser$: Observable<any>;
  canManagePizza = CAN_MANAGE_PIZZA;
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
    private basketService: BasketService,
    private geolocation: GeolocationService,
    private userService: UserService,
    private http: UserDataService,
    private router: Router,
    private _ds: DialogService,
    private _ts: TranslateService,
    private _ls: LangService
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {
    this.lang = this._ls.getLang();
    this._ts.setDefaultLang(this._ls.getLang());
    this.userService.setCurrentUser();
    this.currentUser$ = this.userService.currentUser;
    this.basket$ = this.basketService.basket;
    this.basketService.getStorage();
    this.geolocation.askGeoLocation();

    this.items = [
      { label: 'settingsLabel', routerLink: 'auth/user-settings' },
      { label: 'logoutLabel', command: () => { this.logout() } },
    ];


    this.pagesItems = [
      { label: this._ts.instant('pageTitles.promotions'), routerLink: '/promotion' },
      { label: this._ts.instant('pageTitles.pizzas'), routerLink: '/pizza' },
      { label: this._ts.instant('pageTitles.drinks'), routerLink: '/' },
      { label: this._ts.instant('pageTitles.sides'), routerLink: '/' },
      { label: this._ts.instant('pageTitles.desserts'), routerLink: '/' }
    ];


  }

  openModal(): void {
    this.ref = this._ds.open(LoginComponent, {});
  }

  onChangeLang(lang: ELanguage): void {
    this._ts.use(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  logout(): void {
    this.http.logout().subscribe(req => {
      if (!req) {
        this.userService.removeCredentials()
        this.userService.setCurrentUserData(null)
        this.router.navigateByUrl('/').then(() => location.reload());
      }
    });
  }

  get token(): string {
    if (this.isBrowser) {
      return localStorage.getItem('auth');
    }
  }
}
