import { Component, input } from '@angular/core';
import { AddBasketItem } from '@core/basket/basket.actions';
import { BasketProductItem } from '@core/basket/basket.state';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { stubImage } from 'src/utils/stubs';
import { BasketInComponent } from '../basket-in/basket-in/basket-in.component';

@Component({
  selector: 'app-basket-card-item',
  templateUrl: './basket-card-item.component.html',
  styleUrls: ['./basket-card-item.component.scss'],
  standalone: true,
  imports: [LangPipe, TranslateModule, BasketInComponent]
})
export class BasketCardItemComponent {
  item = input.required<BasketProductItem>();

  stubImage = stubImage;

  constructor(private store: Store) { }

  onManageBasket(direction: number): void {
    this.store.dispatch(new AddBasketItem(this.item(), direction));
  }
}
