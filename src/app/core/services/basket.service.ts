import { EventEmitter, Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class BasketService {
  updateBasketAmount: EventEmitter<number> = new EventEmitter();
  updateBasketCount: EventEmitter<number> = new EventEmitter();
  getActualBasketAmount: EventEmitter<any> = new EventEmitter();

  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }

  public set setStorage(value) {
    localStorage.setItem('basket', JSON.stringify(value));
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


  addToLocalStorage(item: object, size: string, price: number) {
    let count;
    let storage = this.storage;
    storage ? this.storage : storage = {};
    const ID = item['id'];
    if (storage[ID] === undefined) {
      storage[ID] = {};
      storage[ID][size] = {
        price: price, count: count = 0, name: item['name'],
        size: size, ingredients: item['ingredients'], id: item['id']
      };
    }
    if (storage[ID][size] === undefined) {
      storage[ID][size] = {
        price: price, count: count = 1, name: item['name'],
        size: size, ingredients: item['ingredients'], id: item['id']
      }
    } else {
      storage[ID][size].count++;
      count = storage[ID][size].count;
    }
    this.setStorage = storage;
    this.actualBasket();
    return count;
  }


  deleteItemLocalStorage(item: object, size: number) {
    let count;
    let storage = this.storage;
    const ID = item['id'];
    if (storage !== null && storage[ID] !== undefined) {
      storage[ID][size].count--;
      count = storage[ID][size].count;
      if (storage[ID][size].count <= 0) {
        delete storage[ID][size];
      };
      if (Object.keys(storage[ID]).length === 0) {
        delete storage[ID];
      }
      if (Object.keys(storage).length === 0) {
        localStorage.removeItem('basket');
      } else {
        this.setStorage = storage;
      }
      this.actualBasket();
      return count;
    }
  }
}