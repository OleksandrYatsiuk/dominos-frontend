import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from '../core/services/basket.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  public totalAmount: number = 0;

  public get list() {
    let index = [];
    let storage = JSON.parse(localStorage.getItem('basket'))
    for (let idx in storage) {
      for (let item in storage[idx]) {
        index.push(storage[idx][item]);
      }
    }
    return index;
  }

  constructor(
    private title: Title,
    private basketService: BasketService
  ) {
    this.basketService.updateBasketAmount.subscribe(cnt => this.totalAmount = cnt);
  }

  ngOnInit(): void {
    this.title.setTitle("Доставка")
    this.totalAmount = (this.basketService.actualBasket()).amount;

  }


}
