import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEventSource,
  NgbSlideEvent
} from '@ng-bootstrap/ng-bootstrap';
import { PizzaDataService } from '../pizza/pizza-data.service';
import { pluck } from 'rxjs/operators';
import { PromotionDataService } from 'src/app/promotion/promotion-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: PizzaDataService, private promoService: PromotionDataService) { }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  promos: [];
  all: any;
  categories: { category: string; items: any; }[];

  togglePaused() {
    this.paused ? this.carousel.cycle() : this.carousel.pause();
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
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


  ngOnInit() {
    this.getPizzaList();
    this.getPromoList();
  }

  getPromoList() {
    this.promoService.getData().subscribe(promos => this.promos = promos.result);
  }


  getPizzaList() {
    this.http.getPizzas()
      .pipe(pluck('result'))
      .subscribe(pizzas => {
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
        this.all = pizzas;
      });
  }
}
