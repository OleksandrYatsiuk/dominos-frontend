import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { Select, Store } from '@ngxs/store';
import { FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaComponent implements OnInit {


  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPizzas())
  }

}
