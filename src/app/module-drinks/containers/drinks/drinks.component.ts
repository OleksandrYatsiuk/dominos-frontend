import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddDrink, DeleteDrink, FetchAllDrinks } from 'src/app/module-drinks/drinks.actions';
import { DrinksState } from '../../drinks.state';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksComponent implements OnInit {

  @Select(DrinksState.drinks)
  drinks$: Observable<string[]>;

  drinkName: string;

  constructor(private store: Store) {
  }
  ngOnInit(): void {
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
