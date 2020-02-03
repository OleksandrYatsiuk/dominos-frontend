import { Component, OnInit, ViewChild } from '@angular/core';
import { RootService } from '../shared/root.service';
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
        'https://media.dominos.ua/slider/slide_image/2019/08/14/PL_1920x736_1.jpg'
    },
    {
      title: 'Оновлена акція! -30% на кожну другу піцу',
      subTitle: '',
      photo:
        'https://media.dominos.ua/slider/slide_image/2019/09/02/-40_slider.jpg'
    },
    {
      title: 'Разом дешевше',
      subTitle: '3 середні піци та пляшку 1л Pepsi усього за 399.99 грн!',
      photo:
        'https://media.dominos.ua/slider/slide_image/2019/11/26/399_slider_pepsi_2_1.jpg'
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
  constructor(private rootService: RootService) { }

  ngOnInit() {
  }

  removeItem(id: number) {
    // this.rootService.removeItem(id).subscribe(() => {
    //   this.ngOnInit();
    // });
  }
}
