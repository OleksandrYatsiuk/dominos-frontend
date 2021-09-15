import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, Observable, pluck, shareReplay, tap } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { ModelPromotion } from '@core/models/promotions/promotions.model';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionComponent implements OnInit {
  promotion$: Observable<ModelPromotionPublic>;
  promotions$: Observable<ModelPromotionPublic[]>;
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
    private _ps: PromotionDataService,
    private title: Title
  ) {
  }

  ngOnInit(): void {

    this.promotion$ = this.route.params
      .pipe(mergeMap(({ id }) => this._ps.getPublicItem(id)),
        tap(promo => {
          this.title.setTitle(`Акція - ${promo.name}`);
          this.promotions$ = this._ps.queryPromotionPublicList()
            .pipe(pluck('result'),
              map(promos => promos.filter(p => p.id !== promo.id)), shareReplay(1));
        })
      );
  }

}
