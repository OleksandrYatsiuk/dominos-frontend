import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { BasketService } from "../../../core/services/basket.service";
import { UserService } from "src/app/core/services/user.service";
import { GeolocationService } from "src/app/core/services/geolocation.service";
import { Router } from "@angular/router";
import { CAN_MANAGE_PIZZA } from "./header-permissions";
import { UserDataService } from "src/app/auth/user-data.service";
import { isPlatformBrowser } from "@angular/common";
import { MenuItem } from "primeng/api";
import { Observable } from "rxjs";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { LoginComponent } from "@shared/components/login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  basket$: Observable<any>;
  currentUser$: Observable<any>;
  canManagePizza = CAN_MANAGE_PIZZA;
  isBrowser: boolean;
  items: MenuItem[];
  pagesItems: MenuItem[];
  ref: DynamicDialogRef

  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private basketService: BasketService,
    private geolocation: GeolocationService,
    private userService: UserService,
    private http: UserDataService,
    private router: Router,
    private _ds: DialogService
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {

    this.userService.setCurrentUser();
    this.currentUser$ = this.userService.currentUser;
    this.basket$ = this.basketService.basket;
    this.basketService.getStorage();
    this.geolocation.askGeoLocation();

    this.items = [
      { label: 'User Settings', routerLink: 'auth/user-settings' },
      { label: 'Logout', command: () => { this.logout() } },
    ];

    this.pagesItems = [
      { label: 'Акції', routerLink: '/promotion' },
      { label: 'Піца', routerLink: '/pizza' },
      { label: 'Напої', routerLink: '/' },
      { label: 'Сайди', routerLink: '/' },
      { label: 'Десерти', routerLink: '/' }
    ];
  }

  openModal(): void {

    this.ref = this._ds.open(LoginComponent, {});
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
      return localStorage.getItem("auth");
    }
  }
}
