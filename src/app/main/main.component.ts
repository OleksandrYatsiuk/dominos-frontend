import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEventSource,
  NgbSlideEvent
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  images = [
    {
      title: 'Domino`s Club',
      subTitle: 'Програма підвищення задоволення',
      photo:
        '../../assets/data/carusel/pl.jpg'
    },
    {
      title: 'Оновлена акція! -30% на кожну другу піцу',
      subTitle: '',
      photo:
        '../../assets/data/carusel/slider.jpg'
    },
    {
      title: 'Разом дешевше',
      subTitle: '3 середні піци та пляшку 1л Pepsi усього за 399.99 грн!',
      photo:
        '../../assets/data/carusel/pepsi.jpg'
    }
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
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
  constructor() { }

  ngOnInit() {
  }

}
