import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasketService } from '../../../core/services/basket.service';
import { RootService } from 'src/app/core/services/root.service';
import { pluck } from 'rxjs/operators';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})

export class PizzaItemComponent implements OnInit {

  @Input() item;

  public count = 0;
  public ingredientsList = [];
  public price: number;
  public pizzaForm: FormGroup;
  public get storage() {
    return JSON.parse(localStorage.getItem('basket'));
  }
  public set setStorage(value) {
    localStorage.setItem('basket', JSON.stringify(value));
  }

  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
    private http: RootService
  ) {
  }

  ngOnInit() {
    this.http.getIngredientsList('1', '20','name')
      .pipe(pluck('result'))
      .subscribe(ingredients => {
        ingredients.map(element => {
          this.item.ingredients.forEach(ingredient => {
            if (element.id == ingredient) {
              this.ingredientsList.push(element);
            }
          });
        });
      })

    this.pizzaForm = this.fb.group({
      size: ['Маленька', []],
      form: ['Стандарт', []],
      weigth: [this.price = this.item.price.small, []]
    });
    this.onChanges();

    const size = this.pizzaForm.controls.size.value;
    this.basketService.actualBasket();
    if (this.storage !== null) {
      if (this.storage[this.item.id] !== undefined) {
        if (this.storage[this.item.id][size] !== undefined) {
          this.count = this.storage[this.item.id][size].count;
        }
      }
    }
  }

  onChanges() {
    this.pizzaForm.valueChanges.subscribe(val => {
      val.size === 'Маленька' ? this.price = this.item.price.small : false;
      val.size === 'Середня' ? this.price = this.item.price.middle : false;
      val.size === 'Велика' ? this.price = this.item.price.big : false;
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
  }

  addToCard(item) {
    this.count = this.basketService.addToLocalStorage(item, this.pizzaForm.controls.size.value, this.price);
  }

  removeFromCard(item) {
    this.count = this.basketService.deleteItemLocalStorage(item, this.pizzaForm.controls.size.value);
  }
}

