import { EventEmitter, Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class BasketService {
  updateBasketAmount: EventEmitter<number> = new EventEmitter();
  updateBasketCount: EventEmitter<number> = new EventEmitter();
  getActualBasketAmount: EventEmitter<any> = new EventEmitter();

  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }
  public amount: number;
  public count: number;

  public actualBasket() {
    let total = 0, count = 0;
    for (let key in this.storage) {
      let item = this.storage[key];
      for (let size in item) {
        count += item[size].count;
        total += item[size].price * item[size].count;
      }
    }
    let basket = {
      amount: +total.toFixed(2),
      count: count,
    }
    this.amount = basket.amount;
    this.count = basket.count;
    this.updateBasketAmount.emit(this.amount);
    this.updateBasketCount.emit(this.count);
    return basket;
  };
}
