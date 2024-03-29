import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { Select, Store } from '@ngxs/store';
import { PromotionsState } from 'src/app/module-promotions/promotions/promotions.state';
import { FetchAllPromotions } from 'src/app/module-promotions/promotions/promotions.actions';
import { stubImage } from 'src/utils/stubs';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsSliderComponent implements OnInit {

  defaultImage = stubImage;
  @Select(PromotionsState.promotions) promos$: Observable<ModelPromotionPublic[]>;
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPromotions({ limit: 10, sort: '-startedAt' }));
  }

}
