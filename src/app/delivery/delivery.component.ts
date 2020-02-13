import { Component, OnInit, Input } from '@angular/core';
import { RootService } from '../shared/root.service';
import { Router } from '@angular/router';
import { BasketService } from '../shared/layout/basket.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  public totalAmount: number;

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
  }

  ngOnInit() {

    this.totalAmount = (this.basketService.actualBasket()).amount;

  }


}
