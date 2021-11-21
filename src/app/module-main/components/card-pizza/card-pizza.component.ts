import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AddPizzaToBasket, DeletePizzaFromBasket } from '@core/basket/basket.actions';
import { BasketItem, BasketState } from '@core/basket/basket.state';
import { Pizza } from '@core/models/pizza.interface';
import { Size } from '@core/models/size.interface';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-pizza',
  templateUrl: './card-pizza.component.html',
  styleUrls: ['./card-pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardPizzaComponent implements OnInit {

  @Input() item: Pizza;
  public count = 0;
  public ingredientsList = [];
  public price: number;
  public size: number;
  options: SelectItem[] = [];
  defaultImage = '/assets/img/stub-image.png';
  pizzas$: Observable<BasketItem[]>;
  selectedSize: string = 'small';
  constructor(
    private _store: Store,
    private _translateService: TranslateService
  ) {
  }

  ngOnInit() {

    this.pizzas$ = this._store.select<BasketItem[]>(BasketState.selectedPizza(this.item.id));

    this.options = [
      { label: 'Стандарт', value: 'Стандарт' },
      { label: 'Тонке', value: 'Тонке' },
      { label: 'Філадельфія', value: 'Філадельфія' },
      { label: 'Борт Хот-Дог', value: 'Борт Хот-Дог' },
    ]


  }


  convertToArray(size: Size): SelectItem[] {
    const sizes = Object.entries(size)
      .filter(([key, value]) => value)
      .map(([key, value]) => ({ value: key, label: this._translateService.instant(`sizesLabels.${key}`) }));
    if (!this.selectedSize && sizes.length > 0) {
      this.selectedSize = sizes[0].value;
    }
    return sizes;
  }

  onManageBasket(direction: number): void {
    if (direction === 1) {
      this._store.dispatch(new AddPizzaToBasket(this.item, this.selectedSize));
    } else {
      this._store.dispatch(new DeletePizzaFromBasket(this.item, this.selectedSize));
    }

  }
}

