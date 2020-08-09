import { Component, OnInit } from "@angular/core";
import { BasketService } from "../../../core/services/basket.service";
import { LoginComponent } from "src/app/auth/login/login.component";
import { UserService } from "src/app/core/services/user.service";
import { GeolocationService } from "src/app/core/services/geolocation.service";
import { Router } from "@angular/router";
import { CAN_MANAGE_PIZZA } from "./header-permissions";
import { MatDialog } from "@angular/material";
import { UserDataService } from "src/app/auth/user-data.service";

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
    private basketService: BasketService,
    private http: UserDataService,
    private geolocation: GeolocationService,
    private user: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setCurrentUser();
    // const basket = this.basket.actualBasket();
    // this.count = basket.count;
    // this.amount = basket.amount;
    // this.basket.updateBasketAmount.subscribe(cnt => (this.amount = cnt));
    // this.basket.updateBasketCount.subscribe(cnt => (this.count = cnt));
    this.basketService.basket.subscribe(options => this.basket = options);
    this.geolocation.askGeoLocation();
  }

  setCurrentUser() {
    this.user.setCurrentUser();
    this.user.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  openModal() {
    this.dialog.open(LoginComponent, { autoFocus: true });
  }

  logout() {
    this.http.logout().subscribe(req => {
      if (!req) {
        localStorage.removeItem("auth");
        this.router.navigate(["/"]);
        setTimeout(() => {
          location.reload();
        }, 20);
      }
    });
  }
}
