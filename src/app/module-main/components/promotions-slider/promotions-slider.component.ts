import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { pluck } from 'rxjs';
import { Observable } from 'rxjs';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsSliderComponent implements OnInit {

  defaultImage = '/assets/img/stub-image.png';
  promos$: Observable<ModelPromotionPublic[]>;
  config: SwiperConfigInterface = {
    slidesPerView: 1,
    observer: true
  }
  constructor(private _ps: PromotionDataService) { }

  ngOnInit(): void {
    this.promos$ = this._ps.queryPromotionPublicList().pipe(pluck('result'));
  }

}
