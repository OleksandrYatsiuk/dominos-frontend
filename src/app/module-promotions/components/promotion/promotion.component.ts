import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { mergeMap, Observable } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';
import { Select, Store } from '@ngxs/store';
import { PromotionsState } from '../../promotions/promotions.state';
import { FetchAllPromotions, FetchSimplePromotion } from '../../promotions/promotions.actions';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionComponent implements OnInit {

  @Select(PromotionsState.promotionsWithoutActive)
  promotions$: Observable<ModelPromotionPublic[]>;

  @Select(PromotionsState.promotion)
  promotion$: Observable<ModelPromotionPublic>;


  status = PromotionStatuses;

  config: SwiperConfigInterface = {
    observer: true,
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2.45,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 4,
        spaceBetween: 30
      },
    },
  }
  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllPromotions());
    this.route.params.pipe(mergeMap(({ id }) => this.store.dispatch(new FetchSimplePromotion(id)))).subscribe();
  }

}
