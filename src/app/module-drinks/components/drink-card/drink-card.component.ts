import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { AddDrinkToBasket, DeleteDrinkFromBasket } from '@core/basket/basket.actions';
import { BasketItem, BasketState } from '@core/basket/basket.state';
import { Drink } from '@core/models/drinks/drinks.model';
import { Size } from '@core/models/size.interface';
import { Store } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinkCardComponent implements OnInit {
  @Input() drink: Drink;
  drinks$: Observable<BasketItem[]>;
  selectedSize: string;
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.drinks$ = this._store.select<BasketItem[]>(BasketState.selectedDrink(this.drink.id));
  }


  convertToArray(size: Partial<Size>): SelectItem[] {
    const sizes = Object.entries(size)
      .filter(([key, value]) => value)
      .map(([key, value]) => ({ value: key, label: `${value}` }));
    if (!this.selectedSize && sizes.length > 0) {
      this.selectedSize = sizes[0].value;
    }
    return sizes;
  }

  onManageBasket(direction: number): void {
    if (direction === 1) {
      this._store.dispatch(new AddDrinkToBasket(this.drink, this.selectedSize))
    } else {
      this._store.dispatch(new DeleteDrinkFromBasket(this.drink, this.selectedSize));
    }
  }
}
