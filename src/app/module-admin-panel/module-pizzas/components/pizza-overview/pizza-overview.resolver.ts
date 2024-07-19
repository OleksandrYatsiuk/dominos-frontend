import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { GetPizzaItem } from '../../pizzas/pizzas.actions';

@Injectable()
export class PizzaOverviewResolver  {
  constructor(private _store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    route
    return this._store.dispatch(new GetPizzaItem(route.params.id)).pipe(pluck('pizzas.pizza'));
  }
}
