import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
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
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) _pid: any
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  public key = 'basket';
  public _storage: PizzaItem[];
  private count$ = new BehaviorSubject<BasketOptions>({ count: 0, amount: '0' });

  public get storage() {
    if (this._getItem()) {
      this._storage = this.localStorage()
    } else {
      this._storage = []
    }
    this.updateCount(this.checkBasket(this._storage));
    return this._storage;

  }


  basket = this.count$.asObservable();

  public updateCount(opt: BasketOptions): void {
    this.count$.next(opt);
  }

  private localStorage(): PizzaItem[] {
    return JSON.parse(this._getItem() || []);
  }


  private _getItem(): any {
    if (this.isBrowser) {
      return localStorage.getItem(this.key);
    }
  }

  private _setItem(value: any): void {
    if (this.isBrowser) {
      localStorage.setItem(this.key, value);
    }
  }


  public add(item: PizzaItem): void {
    const index = this.storage.findIndex(pizza => item.id === pizza.id && item.size === pizza.size);
    if (index === -1) {
      this._storage.push(Object.assign(item, { count: 1 }));
    } else {
      ++this._storage[index].count
    }
    this.updateCount(this.checkBasket(this._storage));
    if (this.isBrowser) {
      localStorage.setItem(this.key, JSON.stringify(this._storage));
    }

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
    if (this.isBrowser) {
      localStorage.setItem(this.key, JSON.stringify(this._storage));
    }
  }


  public calculateCount(arr: PizzaItem[]): number {
    let value = 0;
    arr?.forEach(el => value += +el.count);
    return value;
  }

  private calculatePrice(arr: PizzaItem[]): string {
    let value = 0;
    arr?.forEach(el => value += +el.price * el.count);
    return Number.parseFloat(value.toString()).toFixed(2);
  }

  private checkBasket(storage: PizzaItem[]): { count: number; amount: string } {
    return { count: this.calculateCount(storage), amount: this.calculatePrice(storage) };
  }

  public getItem(id: string, size: string) {
    return this.storage?.find(el => el.id === id && el.size === size);
  }

  public clear(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.key)
      this.updateCount({ count: 0, amount: '0' });
    }
  }


}
