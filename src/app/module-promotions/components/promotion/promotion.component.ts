import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
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
