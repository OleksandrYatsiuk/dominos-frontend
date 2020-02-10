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

  public count: number = 0;

  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }
  public set setStorage(value) {
    localStorage.setItem('basket', JSON.stringify(value));
  }

  constructor(private fb: FormBuilder, private basketService: BasketService) {
  }

  ngOnInit() {
    this.basketService.actualBasket();
    if (this.storage && this.storage[this.item.id]) {
      this.count = this.storage[this.item.id].count;
    }

    this.pizzaForm = this.fb.group({
      size: ['Маленька', []],
      form: ['Стандарт', []],
    });
  };

  pizzaForm: FormGroup;

  addToCard(item) {
    this.addToLocalStorage(item);
  }

  removeFromCard(item) {
    this.deleteItemLocalStorage(item);
  }

  addToLocalStorage(value: object) {
    let storage = this.storage;
    storage ? this.storage : storage = {};
    const ID = value['id'];
    if (storage[ID] === undefined) {
      storage[ID] = { id: ID, price: value['price']['low'], count: this.count = 1, pizza: value };
    } else {
      storage[ID].count++;
      this.count = storage[ID].count;
    }
    this.setStorage = storage;
    this.basketService.actualBasket();
  }

  deleteItemLocalStorage(value: object) {
    let storage = this.storage;
    const ID = value['id'];
    if (storage !== null && storage[ID] !== undefined) {
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
      this.basketService.actualBasket();
    }
  }
}

