import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PizzaItem {
  id: string;
  size: string;
  name: string;
  price: number;
  image: string;
  count?: number;
}

export interface BasketOptions {
  count: number;
  amount: string;
}

@Injectable({ providedIn: 'root' })

export class BasketService {
  public key = 'basket';
  public _storage: PizzaItem[];
  public get storage() {
    return this.localStorage()
      ? (this._storage = JSON.parse(localStorage.getItem(this.key)))
      : (this._storage = []);
  }

  private count$ = new BehaviorSubject<BasketOptions>(this.checkBasket(this.storage));
  basket = this.count$.asObservable();

  public updateCount(opt: BasketOptions): void {
    this.count$.next(opt);
  }

  private localStorage(): string {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public add(item: PizzaItem) {
    const index = this.storage.findIndex(pizza => item.id === pizza.id && item.size === pizza.size);
    if (index === -1) {
      this._storage.push(Object.assign(item, { count: 1 }));
    } else {
      ++this._storage[index].count
    }
    this.updateCount(this.checkBasket(this._storage));
    localStorage.setItem(this.key, JSON.stringify(this._storage));

  }

  public remove(item: PizzaItem, size?: string) {
    const index = this.storage.findIndex(pizza => item.id === pizza.id && size || item.size === pizza.size);
    if (index !== -1) {
      if (this._storage[index].count > 1) {
        --this._storage[index].count
      } else {
        if (size) {
          this._storage = this._storage.filter(el => el.id !== item.id || (el.id === item.id && el.size !== size))
        } else {
          this._storage = this._storage.filter(el => el.id !== item.id || (el.id === item.id && el.size !== item.size))
        }
      }
    }
    this.updateCount(this.checkBasket(this._storage));
    localStorage.setItem(this.key, JSON.stringify(this._storage));
  }


  public calculateCount(arr: PizzaItem[]): number {
    let value = 0;
    arr.forEach(el => value += +el.count);
    return value;
  }

  private calculatePrice(arr: PizzaItem[]): string {
    let value = 0;
    arr.forEach(el => value += +el.price * el.count);
    return Number.parseFloat(value.toString()).toFixed(2);
  }

  private checkBasket(storage) {
    return { count: this.calculateCount(storage), amount: this.calculatePrice(storage) };
  }

  public getItem(id: string, size: string) {
    return this.storage.find(el => el.id === id && el.size === size);
  }


}
