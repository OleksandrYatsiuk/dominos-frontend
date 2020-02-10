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
      count += item.count;
      total += item.price * item.count;
    }
    let basket = {
      amount: +total.toFixed(2),
      count: count,
    }
    this.amount = basket.amount;
    this.count = basket.count;
    this.updateBasket(basket.count, basket.amount);
    return basket;
  };


  public updateBasket(count, amount) {
    this.updateBasketAmount.emit(amount);
    this.updateBasketCount.emit(count);
  }
}
