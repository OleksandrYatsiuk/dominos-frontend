import { Component, OnInit } from '@angular/core';
import { PizzaDataService } from '../pizza/pizza-data.service';
import { pluck, tap } from 'rxjs/operators';
import { PromotionDataService } from 'src/app/promotion/promotion-data.service';
import { Observable } from 'rxjs';
import { ModelPromotion } from 'src/app/promotion/promotion-create/promotions.interface';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  config: SwiperConfigInterface = {
    slidesPerView: 1,
    observer: true
  }
  defaultImage = '/assets/data/default_image.png';
  promos$: Observable<ModelPromotion[]>;
  pizzas$: Observable<any[]>;
  categories: { category: string; items: any; }[];

  constructor(
    private http: PizzaDataService,
    private _ps: PromotionDataService) { }





  ngOnInit(): void {
    this.promos$ = this._queryPromotionList();
    this.getPizzaList();
  }


  getPizzaList(): void {
    this.pizzas$ = this.http.getPizzas()
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

  private _queryPromotionList(): Observable<ModelPromotion[]> {
    return this._ps.getData().pipe(pluck('result'));
  }
}
