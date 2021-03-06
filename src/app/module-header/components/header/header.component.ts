import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { BasketService } from "../../../core/services/basket.service";
import { UserService } from "src/app/core/services/user.service";
import { GeolocationService } from "src/app/core/services/geolocation.service";
import { Router } from "@angular/router";
import { CAN_MANAGE_PIZZA } from "./header-permissions";
import { UserDataService } from "src/app/auth/user-data.service";
import { ModalService } from 'src/app/core/services/modal.service';
import { isPlatformBrowser } from "@angular/common";
import { MenuItem } from "primeng/api";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public count: number;
  basket$: Observable<any>;
  public amount: number;
  public currentUser$: Observable<any>;
  public canManagePizza = CAN_MANAGE_PIZZA;
  isBrowser: boolean;
  items: MenuItem[];
  pagesItems: MenuItem[];

  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private modal: ModalService,
    private basketService: BasketService,
    private geolocation: GeolocationService,
    private userService: UserService,
    private http: UserDataService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  ngOnInit() {

    this.userService.setCurrentUser();
    this.currentUser$ = this.userService.currentUser;
    this.basket$ = this.basketService.basket;
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
    this.modal.openLoginModal();
  }

  logout() {
    this.http.logout().subscribe(req => {
      if (!req) {
        this.userService.removeCredentials()
        this.userService.setCurrentUserData(null)
        this.router.navigateByUrl('/').then(() => location.reload());
      }
    });
  }

  get token(): any {
    if (this.isBrowser) {
      return localStorage.getItem("auth");
    }
  }
}
