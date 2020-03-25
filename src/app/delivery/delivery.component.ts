import { Component, OnInit, Input } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { Router } from '@angular/router';
import { BasketService } from '../core/services/basket.service';

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
    private basketService: BasketService,
    private rootService: RootService) {
    this.basketService.updateBasketAmount.subscribe(cnt => this.totalAmount = cnt);
  }

  ngOnInit() {

    this.totalAmount = (this.basketService.actualBasket()).amount;

  }


}
