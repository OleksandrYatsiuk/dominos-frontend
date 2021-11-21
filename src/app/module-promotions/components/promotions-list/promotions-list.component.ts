import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { PromotionsState } from '../../promotions/promotions.state';
import { Select, Store } from '@ngxs/store';
import { FetchAllPromotions } from '../../promotions/promotions.actions';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {

  @Select(PromotionsState.promotions)
  promotions$: Observable<ModelPromotionPublic[]>;

  constructor(private store: Store) { }
  ngOnInit(): void {
    this.store.dispatch(new FetchAllPromotions());
  }

}
