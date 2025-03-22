import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { PromotionsSliderComponent } from '../promotions-slider/promotions-slider.component';
import { CardPizzaComponent } from '../card-pizza/card-pizza.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PromotionsSliderComponent, CardPizzaComponent]
})
export class MainComponent implements OnInit {
  pizzas = this.store.selectSignal(PizzasState.pizzas);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchAllPizzas({ page: 1, limit: 20 }));
  }
}
