import { Component, Input, Output } from '@angular/core';
import { AddBasketItem } from '@core/basket/basket.actions';
import { BasketProductTypes } from '@core/basket/basket.interface';
import { BasketProductItem } from '@core/basket/basket.state';
import { Store } from '@ngxs/store';
import { stubImage } from 'src/utils/stubs';

@Component({
  selector: 'app-basket-card-item',
  templateUrl: './basket-card-item.component.html',
  styleUrls: ['./basket-card-item.component.scss']
})
export class BasketCardItemComponent {
  @Input() item: BasketProductItem;
  stubImage = stubImage;

  constructor(
    private _store: Store,
  ) {
  }

  onManageBasket(direction: number): void {
    this._store.dispatch(new AddBasketItem(this.item, direction));
  }
}
