import { Component, OnInit } from '@angular/core';
import { PromotionsState } from '../../state/promotions.state';
import { Store } from '@ngxs/store';
import { FetchAllPromotions } from '../../state/promotions.actions';
import { CardNewsComponent } from '@shared/components/card-news/card-news.component';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss'],
  standalone: true,
  imports: [CardNewsComponent],
})
export class PromotionsListComponent implements OnInit {
  promotions = this.store.selectSignal(PromotionsState.promotions);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllPromotions({ sort: '-startedAt' }));
  }

}
