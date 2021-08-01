import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, Observable, pluck, tap } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { ModelPromotion, PromotionStatuses } from 'src/app/module-admin-panel/module-promotions/components/promotion-create/promotions.interface';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionComponent implements OnInit {
  promotion$: Observable<ModelPromotion>;
  promotions$: Observable<ModelPromotion[]>;
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
      .pipe(mergeMap(({ id }) => this._ps.getItem(id).pipe(pluck('result'))),
        tap((promo) => {
          this.title.setTitle(`Акція - ${promo.title}`);
          this.promotions$ = this._ps.getData()
            .pipe(pluck('result'),
              map(promos => promos.filter(p => p.id !== promo.id)));
        })
      );
  }

}
