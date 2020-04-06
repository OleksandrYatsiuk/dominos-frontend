import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasketService } from '../../../core/services/basket.service';


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
    this.count = this.basketService.addToLocalStorage(item, this.pizzaForm.controls.size.value, this.price);
  }

  removeFromCard(item) {
    this.count = this.basketService.deleteItemLocalStorage(item, this.pizzaForm.controls.size.value);
  }
}

