import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pizza } from '@core/models/pizza.interface';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { Select, Store } from '@ngxs/store';
import { FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;

  constructor(
    private _store: Store,
    private _http: HttpClient,
  ) { }

  ngOnInit(): void {
    this._http.get('https://api.saveecobot.com/storage/maps_fire.js?date=2022-06-13T093').subscribe(data => {
      console.log(data);
    })
    this._store.dispatch(new FetchAllPizzas({ page: 1, limit: 20 }))
  }
}
