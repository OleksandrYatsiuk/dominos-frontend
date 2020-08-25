import { Component, OnInit } from "@angular/core";
import { BasketService } from "../../../core/services/basket.service";
import { UserService } from "src/app/core/services/user.service";
import { GeolocationService } from "src/app/core/services/geolocation.service";
import { Router } from "@angular/router";
import { CAN_MANAGE_PIZZA } from "./header-permissions";
import { UserDataService } from "src/app/auth/user-data.service";
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public count: number;
  public basket: any;
  public amount: number;
  public token = localStorage.getItem("auth");
  public currentUser = null;
  public canManagePizza = CAN_MANAGE_PIZZA;

  constructor(
    private modal: ModalService,
    private basketService: BasketService,
    private geolocation: GeolocationService,
    private userService: UserService,
    private config: ApiConfigService,
    private http: UserDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.setCurrentUser();
    this.userService.currentUser.subscribe(user => this.currentUser = user)
    this.basketService.basket.subscribe(options => this.basket = options);
    this.geolocation.askGeoLocation();
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
}
