import { NgClass } from '@angular/common';
import { Component, OnInit, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPizzaToBasket, DeletePizzaFromBasket } from '@core/basket/basket.actions';
import { BasketItem, BasketState } from '@core/basket/basket.state';
import { Pizza } from '@core/models/pizza.interface';
import { Size } from '@core/models/size.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { BasketInModule } from '@shared/components/basket-in/basket-in/basket-in.module';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SelectItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { stubImage } from 'src/utils/stubs';

@Component({
  selector: 'app-card-pizza',
  templateUrl: './card-pizza.component.html',
  styleUrls: ['./card-pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, BasketInModule, SelectButtonModule, LazyLoadImageModule, TranslateModule, RouterModule, LangPipe],
})

export class CardPizzaComponent implements OnInit {
  item = input.required<Pizza>();

  public count = 0;
  public ingredientsList = [];
  public price: number;
  public size: number;
  options: SelectItem[] = [];
  defaultImage = stubImage;
  pizzas = this.store.selectSignal<BasketItem[]>(BasketState.selectedPizza(this.item().id));

  selectedSize: string = 'small';
  constructor(
    private store: Store,
    private _translateService: TranslateService
  ) {
  }

  ngOnInit() {


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
      this.store.dispatch(new AddPizzaToBasket(this.item(), this.selectedSize));
    } else {
      this.store.dispatch(new DeletePizzaFromBasket(this.item(), this.selectedSize));
    }

  }
}

