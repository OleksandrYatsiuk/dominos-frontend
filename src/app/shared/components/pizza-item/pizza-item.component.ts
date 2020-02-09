import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasketService } from '../../layout/basket.service';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})

export class PizzaItemComponent implements OnInit {
  @Input() item;

  public totalCount: number = 0;
  public count: number = 0;
  public basketAmount: number = 0;
  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }
  public set setStorage(value) {
    localStorage.setItem('basket', JSON.stringify(value));
  }

  constructor(private fb: FormBuilder, private basketService: BasketService) {
  }

  ngOnInit() {
    this.getActualBasketAmount();
    const storage = JSON.parse(localStorage.getItem('basket'));
    if (storage) {
      if (storage[this.item.id]) {
        this.count = storage[this.item.id].count;
      }
    };
    this.basketService.updateBasket(this.totalCount, this.basketAmount);

    this.pizzaForm = this.fb.group({
      size: ['Маленька', []],
      form: ['Стандарт', []],
    });
  };

  pizzaForm: FormGroup;


  addToCard(item) {
    this.addToLocalStorage(item);
    this.getActualBasketAmount();
    this.basketService.updateBasket(this.totalCount, this.basketAmount);
  }

  removeFromCard(item) {
    this.deleteItemLocalStorage(item);
    this.getActualBasketAmount();
    this.basketService.updateBasket(this.totalCount, this.basketAmount);
  }

  getActualBasketAmount() {
    let total = 0, count = 0;

    for (let key in this.storage) {
      let item = this.storage[key];
      count += item.count;
      total += item.price * item.count;
    }
    this.basketAmount = +total.toFixed(2);
    this.totalCount = count;
  }

  addToLocalStorage(value: object) {
    let storage = this.storage;
    storage ? this.storage : storage = {};
    const ID = value['id'];
    if (storage[ID] === undefined) {
      storage[ID] = { id: ID, price: value['price']['low'], count: this.count = 1 };
    } else {
      storage[ID].count++;
      this.count = storage[ID].count;
    }
    this.setStorage = storage;
  }

  deleteItemLocalStorage(value: object) {
    let storage = this.storage;
    const ID = value['id'];
    if (storage !== null) {
      if (storage[ID] !== undefined) {
        storage[ID].count--;
        this.count = storage[ID].count;
        if (storage[ID].count <= 0) {
          delete storage[ID];
        };
        if (Object.keys(storage).length === 0) {
          localStorage.removeItem('basket');
        } else {
          this.setStorage = storage;
        }
      }
    }
  }
}

