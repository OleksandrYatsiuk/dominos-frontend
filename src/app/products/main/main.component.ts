import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEventSource,
  NgbSlideEvent
} from '@ng-bootstrap/ng-bootstrap';
import { PizzaDataService } from '../pizza/pizza-data.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private http: PizzaDataService) { }

  public images = [
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/03/23/address-delivery_slider-min.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/03/16/dost_slider.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/03/31/curry_slider.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/04/01/slider-min.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/06/17/-50-wings_slider_rus.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/04/02/woweekend_slider_rus.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/06/18/combo_slider_ukr_rus.jpg'
    },
    {
      photo:
        'https://media.dominos.ua/slider/slide_image/2020/06/05/beer-fest_slider_rus.jpg  '
    }
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
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
