import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, output, computed, effect } from '@angular/core';
import { BasketItem } from '@core/basket/basket.state';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-basket-in',
  templateUrl: './basket-in.component.html',
  styleUrls: ['./basket-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, TranslateModule],
})
export class BasketInComponent {

  size = input<string>();

  productId = input<string>();

  products = input<BasketItem[]>([]);

  onChange = output<number>();

  constructor() { }

  hasDrinkInBasket(items: BasketItem[]): boolean {
    items = items?.filter((item) => item.id === this.productId() && item.size === this.size());
    return items?.length ? true : false;
  }

  count = computed(() => this.products()?.find((item) => item.size === this.size())?.count || 0);

  addToBasket(): void {
    this.onChange.emit(1);
  }

  removeFromBasket(): void {
    this.onChange.emit(-1);
  }

  hasProducts = computed(() => this.products()?.find((item) => item.size === this.size())?.count ? true : false)
}
