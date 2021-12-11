import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { pluck } from 'rxjs';
import { Observable } from 'rxjs';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { Select, Store } from '@ngxs/store';
import { PromotionsState } from 'src/app/module-promotions/promotions/promotions.state';
import { FetchAllPromotions } from 'src/app/module-promotions/promotions/promotions.actions';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsSliderComponent implements OnInit {

  defaultImage = '/assets/img/stub-image.png';
  @Select(PromotionsState.promotions) promos$: Observable<ModelPromotionPublic[]>;
  config: SwiperConfigInterface = {
    slidesPerView: 1,
    observer: true
  }
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPromotions({ limit: 10, sort: '-startedAt' }));
  }

}
