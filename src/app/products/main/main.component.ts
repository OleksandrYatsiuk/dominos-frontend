import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEventSource,
  NgbSlideEvent
} from '@ng-bootstrap/ng-bootstrap';
import { PizzaDataService } from '../pizza/pizza-data.service';
import { pluck, tap } from 'rxjs/operators';
import { PromotionDataService } from 'src/app/promotion/promotion-data.service';
import { Observable } from 'rxjs';
import { ModelPromotion } from 'src/app/promotion/promotion-create/promotions.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private http: PizzaDataService,
    private _ps: PromotionDataService) { }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  promos$: Observable<ModelPromotion[]>;
  pizzas$: Observable<any[]>;
  categories: { category: string; items: any; }[];

  togglePaused() {
    this.paused ? this.carousel.cycle() : this.carousel.pause();
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }


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
    return this._ps.getData().pipe(pluck('result'), tap((res) => console.log(res)));
  }
}
