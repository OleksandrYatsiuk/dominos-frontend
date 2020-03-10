import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BasketService } from '../basket.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public amount: number;
  public token = localStorage.getItem('auth');

  constructor(private modalService: NgbModal, private basket: BasketService, private http: AuthService) {
  }

  ngOnInit() {
    const basket = this.basket.actualBasket();
    this.count = basket.count;
    this.amount = basket.amount;

    this.basket.updateBasketAmount.subscribe(cnt => this.amount = cnt);
    this.basket.updateBasketCount.subscribe(cnt => this.count = cnt);
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
