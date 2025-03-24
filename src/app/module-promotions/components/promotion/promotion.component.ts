import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { PromotionStatuses } from '@core/models/promotions/promotions-public.model';
import { Store } from '@ngxs/store';
import { PromotionsState } from '../../state/promotions.state';
import { FetchAllPromotions, FetchSimplePromotion } from '../../state/promotions.actions';
import { CardNewsComponent } from '@shared/components/card-news/card-news.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardNewsComponent, DatePipe],
  providers: [DatePipe],
})
export class PromotionComponent implements OnInit {
  promotions = this.store.selectSignal(PromotionsState.promotionsWithoutActive);

  promotion = this.store.selectSignal(PromotionsState.promotion);

  status = PromotionStatuses;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllPromotions());
    this.route.params.pipe(mergeMap(({ id }) => this.store.dispatch(new FetchSimplePromotion(id)))).subscribe();
  }

}
