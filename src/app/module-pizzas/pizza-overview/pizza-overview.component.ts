import { Component, inject, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { map, switchMap, tap } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { GetPizzaItem } from '../../module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from '../../module-admin-panel/module-pizzas/pizzas/pizzas.state';

@Component({
  selector: 'app-pizza-overview',
  templateUrl: './pizza-overview.component.html',
  styleUrls: ['./pizza-overview.component.scss'],
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, LangPipe],
  providers: [LangPipe],
})

export class PizzaOverviewComponent {
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private injector: Injector,
  ) { }

  pizza$ = this.route.params.pipe(
    map((params) => params.id),
    switchMap((id) => this.store.dispatch(new GetPizzaItem(id))),
    switchMap(() => this.store.select(PizzasState.pizza)),
    tap((pizza) => {
      this.injector.get(Title).setTitle(`Піца - ${this.injector.get(LangPipe).transform(pizza.name)}`);
    }),
  )
}
