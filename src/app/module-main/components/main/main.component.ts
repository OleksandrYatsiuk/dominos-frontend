import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PizzaDataService } from '../../../core/services/pizza-data.service';
import { pluck, tap } from 'rxjs/operators';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { Observable } from 'rxjs';
import { ModelPromotion } from 'src/app/module-admin-panel/module-promotions/components/promotion-create/promotions.interface';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Pizza } from '@core/models/pizza.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  defaultImage = '/assets/data/default_image.png';
  promos$: Observable<ModelPromotion[]>;
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
