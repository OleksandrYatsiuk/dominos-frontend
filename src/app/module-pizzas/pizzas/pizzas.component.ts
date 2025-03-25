import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { CardPizzaComponent } from 'src/app/module-main/components/card-pizza/card-pizza.component';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardPizzaComponent],
})
export class PizzasComponent implements OnInit {
  pizzas = this._store.selectSignal(PizzasState.pizzas);

  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPizzas())
  }
}
