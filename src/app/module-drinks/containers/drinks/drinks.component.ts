import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DrinksCategory } from '@core/enums/drinks-categories.enum';
import { Drink } from '@core/models/drinks/drinks.model';
import { Select, Store } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AddDrink, DeleteDrink, FetchAllDrinks } from 'src/app/module-drinks/drinks.actions';
import { DrinksState } from '../../drinks.state';

@Component({
    selector: 'app-drinks',
    templateUrl: './drinks.component.html',
    styleUrls: ['./drinks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DrinksComponent implements OnInit {

  @Select(DrinksState.drinks)
  drinks$: Observable<Drink[]>;
  categories: SelectItem[];

  drinkName: string;

  constructor(private store: Store) {
  }
  ngOnInit(): void {

    this.categories = Object.values(DrinksCategory)
      .filter(value => Number(value))
      .map(value => ({ label: `categoriesLabels.drinks.${value}`, value }))
    this.store.dispatch(new FetchAllDrinks());
  }

  addDrink(drink: any): void {
    this.store.dispatch(new AddDrink(drink));
    this.drinkName = '';
  }

  removeDrink(name: string): void {
    this.store.dispatch(new DeleteDrink(name));
  }
}
