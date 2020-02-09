import { EventEmitter, Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class BasketService {
  updateBasketAmount: EventEmitter<number> = new EventEmitter();
  updateBasketCount: EventEmitter<number> = new EventEmitter();

  public updateBasket(count, amount) {
    this.updateBasketAmount.emit(amount);
    this.updateBasketCount.emit(count);
  }
}
