import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { pluck } from 'rxjs';
import { Observable } from 'rxjs';
import { ModelPromotion } from 'src/app/module-admin-panel/module-promotions/components/promotion-create/promotions.interface';
import { PromotionDataService } from '@core/services/promotion-data.service';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsSliderComponent implements OnInit {

  defaultImage = '/assets/data/default_image.png';
  promos$: Observable<ModelPromotion[]>;
  config: SwiperConfigInterface = {
    slidesPerView: 1,
    observer: true
  }
  constructor(private _ps: PromotionDataService) { }

  ngOnInit(): void {
    this.promos$ = this._queryPromotionList();
  }
  private _queryPromotionList(): Observable<ModelPromotion[]> {
    return this._ps.getData().pipe(pluck('result'));
  }

}
