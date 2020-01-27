import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RootService } from '../../../shared/root.service';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})

export class PizzaItemComponent {

  imageSrc = require('../../../../assets/data/pizza.jpg');

  @Input() item;
  active = false;
  basket = [];
  price;
  isActive: boolean = false;
  sizes = ['Маленька', 'Середня', "Велика"];

  constructor(private rootService: RootService) { }

  updateLocalStorage(storage: string, newValue: object) {
    const count = JSON.parse(storage);
    count.push({ id: newValue['id'], price: newValue['price'] });
    localStorage.setItem('basket', JSON.stringify(count));
  }



  onClickMe(item) {
    // this.rootService.$bashChanges.next(item);
    this.price ? this.price : item.price.low;
    if (!localStorage.getItem('basket')) {
      this.basket.push({ id: item.id, price: this.price });
      localStorage.setItem('basket', JSON.stringify([{ id: item.id, price: this.price }]));
    } else {
      this.updateLocalStorage(localStorage.getItem('basket'), { id: item.id, price: this.price });
    }
  }

  getPizzaPrice(item, $event) {
    switch ($event.srcElement.innerText) {
      case this.sizes[0]:
        return this.price = item.price.low;
      case this.sizes[1]:
        this.isActive = !this.isActive;
        return this.price = item.price.medium;
      case this.sizes[2]:
        this.isActive = !this.isActive;
        return this.price = item.price.high;
    }
  }
}
