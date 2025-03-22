import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { BasketItem } from '@core/basket/basket.state';

@Component({
    selector: 'app-basket-in',
    templateUrl: './basket-in.component.html',
    styleUrls: ['./basket-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BasketInComponent {
  @Input() size: string;
  @Input() productId: string;
  @Input() products: BasketItem[];
  @Output() onChange = new EventEmitter<number>();
  constructor() { }

  hasDrinkInBasket(items: BasketItem[]): boolean {
    items = items?.filter(item => item.id === this.productId && item.size === this.size);
    return items?.length ? true : false;
  }
  calculateCount(items: BasketItem[]): number {
    return items?.find(item => item.size === this.size)?.count || 0
  }

  addToBasket(): void {
    this.onChange.emit(1);
  }

  removeFromBasket(): void {
    this.onChange.emit(-1);
  }


  get hasProducts(): boolean {
    return this.products?.find(item => item.size === this.size)?.count ? true : false;
  }

}
