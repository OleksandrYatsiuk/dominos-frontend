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
  public price: number;
  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }
  public set setStorage(value) {
    localStorage.setItem('basket', JSON.stringify(value));
  }

  constructor(private fb: FormBuilder, private basketService: BasketService) {
  }

  ngOnInit() {
    this.pizzaForm = this.fb.group({
      size: ['Маленька', []],
      form: ['Стандарт', []],
      weigth: [this.price = this.item.price.low, []]
    });
    this.onChanges();

    let size = this.pizzaForm.controls.size.value;
    this.basketService.actualBasket();
    if (this.storage !== null) {
      if (this.storage[this.item.id] !== undefined) {
        if (this.storage[this.item.id][size] !== undefined) {
          this.count = this.storage[this.item.id][size].count;
        }
      }
    }


  };

  pizzaForm: FormGroup;

  onChanges() {
    this.pizzaForm.valueChanges.subscribe(val => {
      val.size === "Маленька" ? this.price = this.item.price.low : false;
      val.size === "Середня" ? this.price = this.item.price.medium : false;
      val.size === "Велика" ? this.price = this.item.price.high : false;
      if (this.storage !== null) {
        if (this.storage[this.item.id] !== undefined) {
          if (this.storage[this.item.id][val.size] !== undefined) {
            this.count = this.storage[this.item.id][val.size].count;
          } else {
            this.count = 0;
          }
        }
      }
    });
  };

  addToCard(item) {
    this.addToLocalStorage(item);
  }

  removeFromCard(item) {
    this.deleteItemLocalStorage(item);
  }

  addToLocalStorage(value: object) {
    let size = this.pizzaForm.controls.size.value;
    let storage = this.storage;
    storage ? this.storage : storage = {};
    const ID = value['id'];
    if (storage[ID] === undefined) {
      storage[ID] = {};
      storage[ID][size] = { price: this.price, count: 0, name: this.item.name, size: size, ingredients: this.item.ingredients };
    }
    if (storage[ID][size] === undefined) {
      storage[ID][size] = { price: this.price, count: this.count = 1, name: this.item.name, size: size, ingredients: this.item.ingredients }
    } else {
      storage[ID][size].count++;
      this.count = storage[ID][size].count;
    }
    this.setStorage = storage;
    this.basketService.actualBasket();
  }

  deleteItemLocalStorage(value: object) {
    let size = this.pizzaForm.controls.size.value;
    let storage = this.storage;
    const ID = value['id'];
    if (storage !== null && storage[ID] !== undefined) {
      storage[ID][size].count--;
      this.count = storage[ID][size].count;
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
      this.basketService.actualBasket();
    }
  }
}

