import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BasketService, PizzaItem } from '../../../core/services/basket.service';

export enum EPizzaSizes {
  SMALL = 1,
  MEDIUM = 2,
  BIG = 3
}

@Component({
  selector: 'app-card-pizza',
  templateUrl: './card-pizza.component.html',
  styleUrls: ['./card-pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardPizzaComponent implements OnInit {

  @Input() item;

  public count = 0;
  public ingredientsList = [];
  public price: number;
  public size: number;
  public pizzaForm: FormGroup;
  sizesEnum = EPizzaSizes;
  sizes: SelectItem<{ price: number; weight: number, type: EPizzaSizes }>[] = [];
  options: SelectItem[] = [];
  defaultImage = '/assets/img/stub-image.png';
  constructor(
    private fb: FormBuilder,
    private basketService: BasketService,
  ) {
  }

  ngOnInit() {


    this.options = [
      { label: 'Стандарт', value: 'Стандарт' },
      { label: 'Тонке', value: 'Тонке' },
      { label: 'Філадельфія', value: 'Філадельфія' },
      { label: 'Борт Хот-Дог', value: 'Борт Хот-Дог' },
    ]

    this.sizes = [
      {
        label: 'Маленька',
        value: {
          type: EPizzaSizes.SMALL,
          price: this.item.price.small,
          weight: this.item.weight.small
        }
      },
      {
        label: 'Середня',
        value: {
          type: EPizzaSizes.MEDIUM,
          price: this.item.price.middle,
          weight: this.item.weight.middle
        }
      },
      {
        label: 'Велика',
        value: {
          type: EPizzaSizes.BIG,
          price: this.item.price.big,
          weight: this.item.weight.big

        }
      },
    ];

    this.pizzaForm = this.fb.group({
      options: ['Стандарт', []],
      size: [this.sizes[0].value, []]
    });


    this.onChanges();

    this.updatePizzaSizeCount(this.pizzaForm.controls.size?.value)
  }

  private updatePizzaSizeCount({ type }: PizzaItem) {
    const storage: PizzaItem[] = this.basketService.getStorage();
    const result = storage.find(p => this.item.id === p.id && type === p?.type);
    this.count = result?.count || 0;
  }

  onChanges() {
    this.pizzaForm.valueChanges.subscribe(val => {
      val.size === 'Маленька' ? this.price = this.item.price.small : false;
      val.size === 'Середня' ? this.price = this.item.price.middle : false;
      val.size === 'Велика' ? this.price = this.item.price.big : false;
      this.updatePizzaSizeCount(val.size)
    });
  }

  addToCard(item: PizzaItem): void {
    this.basketService.add(item);
    this.updatePizzaSizeCount(this.sizeValue);
  }

  removeFromCard(item: PizzaItem): void {
    this.basketService.remove(item);
    const storage: PizzaItem[] = this.basketService.getStorage();
    const result = storage.find(p => item.id === p.id && this.sizeValue.type === p.type);

    result?.count > 0 ? this.updatePizzaSizeCount(this.sizeValue) : this.count = 0
  }

  get sizeValue(): PizzaItem {
    return { ...this.pizzaForm.get('size').value, id: this.item.id };
  }
}

