import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../../../core/services/basket.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public amount: number;
  public token = localStorage.getItem('auth');
  public currentUser = null;
  constructor(
    private modalService: NgbModal,
    private basket: BasketService,
    private http: AuthService,
    private geolocation: GeolocationService,
    private user: UserService) { }

  ngOnInit() {
    this.setCurrentUser();
    const basket = this.basket.actualBasket();
    this.count = basket.count;
    this.amount = basket.amount;
    this.basket.updateBasketAmount.subscribe(cnt => this.amount = cnt);
    this.basket.updateBasketCount.subscribe(cnt => this.count = cnt);
    this.geolocation.askGeoLocation()
    
  }

  setCurrentUser() {
    this.user.serCurrentUser();
    this.user.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  openAuthModal() {
    this.modalService.open(LoginComponent);
  }
  logout() {
    this.http.logout().subscribe(req => {
      if (!req) {
        localStorage.removeItem('auth');
        document.location.reload(true);
      };
    });
  }

}

