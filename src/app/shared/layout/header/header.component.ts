import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../components/modal-conponent/modal.component';
import { BasketService } from '../basket.service';
import { AuthComponent } from 'src/app/auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number;
  public amount: number;
  public token = undefined;

  constructor(private modalService: NgbModal, private basket: BasketService) {
  }

  ngOnInit() {
    const basket = this.basket.actualBasket();
    this.count = basket.count;
    this.amount = basket.amount;

    this.basket.updateBasketAmount.subscribe(cnt => this.amount = cnt);
    this.basket.updateBasketCount.subscribe(cnt => this.count = cnt);

    this.token = localStorage.getItem('auth');
  }

  openAuthModal() {
    this.modalService.open(AuthComponent);
  }
  createPizza() {
    this.modalService.open(ModalContentComponent);
  }
}
