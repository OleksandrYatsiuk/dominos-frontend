import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasketService, PizzaItem } from '../../../core/services/basket.service';


@Component({
  selector: 'app-card-pizza',
  templateUrl: './card-pizza.component.html',
  styleUrls: ['./card-pizza.component.scss']
})

export class CardPizzaComponent implements OnInit {

  @Input() item;

  public count = 0;
  public ingredientsList = [];
  public price: number;
  public pizzaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
  ) {
  }

  ngOnInit() {
    this.pizzaForm = this.fb.group({
      size: ['Маленька', []],
      form: ['Стандарт', []],
      weigth: [this.price = this.item.price.small, []]
    });
    this.onChanges();

    this.updatePizzaSizeCount(this.pizzaForm.controls.size.value)
  }

  private updatePizzaSizeCount(size: string) {
    const storagePizza = this.basketService.getItem(this.item.id, size);
    storagePizza ? this.count = storagePizza.count : this.count = 0;
  }

  onChanges() {
    this.pizzaForm.valueChanges.subscribe(val => {
      val.size === 'Маленька' ? this.price = this.item.price.small : false;
      val.size === 'Середня' ? this.price = this.item.price.middle : false;
      val.size === 'Велика' ? this.price = this.item.price.big : false;
      this.updatePizzaSizeCount(val.size)
    });
  }

  addToCard(item: PizzaItem) {
    this.basketService.add({ id: item.id, name: item.name, size: this.pizzaForm.controls.size.value, price: this.price, image: item.image });
    this.updatePizzaSizeCount(this.pizzaForm.controls.size.value)
  }

  removeFromCard(item: PizzaItem) {
    this.basketService.remove(item, this.pizzaForm.controls.size.value);
    this.basketService.storage.length > 0 ? this.updatePizzaSizeCount(this.pizzaForm.controls.size.value) : this.count = 0
  }
}

