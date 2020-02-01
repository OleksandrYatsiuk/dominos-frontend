import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RootService } from '../../../shared/root.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})

export class PizzaItemComponent {

  imageSrc = require('../../../../assets/data/pizza.jpg');

  @Input() item;

  basket = [];


  constructor(private fb: FormBuilder) { }

  pizzaForm: FormGroup;

  ngOnInit() {

    this.pizzaForm = this.fb.group({
      weight: ["", []],
      size: ["Маленька", []],
      form: ["Стандарт", []],

    })

  }


  submit(item) {
    console.log(item);
    const size = this.pizzaForm.controls.size.value;
    console.log(size);
  }



  // updateLocalStorage(storage: string, newValue: object) {
  //   const count = JSON.parse(storage);
  //   count.push({ id: newValue['id'], price: newValue['price'] });
  //   localStorage.setItem('basket', JSON.stringify(count));
  // }

  // onClick(event, i) {
  //   console.log(i);
  //   console.log(event);
  // }

  // onClickMe(item) {
  //   this.price ? this.price : item.price.low;
  //   if (!localStorage.getItem('basket')) {
  //     this.basket.push({ id: item.id, price: this.price });
  //     localStorage.setItem('basket', JSON.stringify([{ id: item.id, price: this.price }]));
  //   } else {
  //     this.updateLocalStorage(localStorage.getItem('basket'), { id: item.id, price: this.price });
  //   }
  // }

  // clickEvent() {
  //   this.status = !this.status;
  // }
}
