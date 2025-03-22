import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { PromotionsState } from 'src/app/module-promotions/promotions/promotions.state';
import { FetchAllPromotions } from 'src/app/module-promotions/promotions/promotions.actions';
import { stubImage } from 'src/utils/stubs';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LazyLoadImageModule, RouterModule, TranslateModule],
})
export class PromotionsSliderComponent implements OnInit {
  defaultImage = stubImage;

  promos = this._store.selectSignal(PromotionsState.promotions);

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPromotions({ limit: 10, sort: '-startedAt' }));
  }

}
