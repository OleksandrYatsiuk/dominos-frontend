import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PizzaDataService } from '../../../core/services/pizza-data.service';
import { pluck, tap } from 'rxjs/operators';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { Observable } from 'rxjs';
import { ModelPromotion } from '@core/models/promotions/promotions.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Pizza } from '@core/models/pizza.interface';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  defaultImage = '/assets/img/stub-image.png';
  promos$: Observable<ModelPromotionPublic[]>;
  pizzas$: Observable<any[]>;
  categories: { category: string; items: any; }[];

  constructor(
    private _ps: PizzaDataService) { }

  ngOnInit(): void {
    this.pizzas$ = this.queryPizzaList();
  }


  private queryPizzaList(): Observable<Pizza[]> {
    return this._ps.getPizzas({ page: 1, limit: 20 })
      .pipe(pluck('result'),
        tap((pizzas) => {
          this.categories = [
            {
              category: 'Краща Ціна',
              items: pizzas.filter(el => el.category === 'Краща Ціна')
            },
            {
              category: 'Класичні',
              items: pizzas.filter(el => el.category === 'Класичні')
            },
            {
              category: 'Фірмові',
              items: pizzas.filter(el => el.category === 'Фірмові')
            },
          ];
        }));
  }
}
