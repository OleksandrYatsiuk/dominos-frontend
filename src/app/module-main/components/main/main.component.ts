import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pizza } from '@core/models/pizza.interface';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { Select, Store } from '@ngxs/store';
import { FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPizzas({ page: 1, limit: 20 }))
  }
}
