import { Injectable } from '@angular/core';
import { DrinksCategory } from '@core/enums/drinks-categories.enum';
import { Drink } from '@core/models/drink/drink.interface';
import { DrinksService } from '@core/services/drinks/drinks.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { pluck, tap } from 'rxjs';
import { AddDrink, DeleteDrink, EditDrink, FetchAllDrinks } from './drinks.actions';

export interface DrinksStateModel {
  drinks: Drink[];
  categories: SelectItem[]
}

@State<DrinksStateModel>({
  name: 'drinks',
  defaults: {
    drinks: [],
    categories: Object.values(DrinksCategory)
      .filter(c => Number.isInteger(c))
      .map(c => ({ value: c, label: String(c) }))
  }
})

@Injectable()
export class DrinksState {

  constructor(private _drinksService: DrinksService) { }

  @Selector()
  static drinks(state: DrinksStateModel) {
    return state.drinks;
  }

  @Selector()
  static drinkCategories(state: DrinksStateModel): SelectItem[] {
    return state.categories;
  }

  @Action(FetchAllDrinks)
  getDrinks({ getState, setState }: StateContext<DrinksStateModel>, { payload }: FetchAllDrinks) {
    return this._drinksService.queryDrinkList(payload).pipe(pluck('result'), tap((drinks) => {
      const state = getState();
      setState({
        ...state,
        drinks: drinks as Drink[],
      });
    }));
  }

  @Action(AddDrink)
  createDrink(ctx: StateContext<DrinksStateModel>, { payload }: AddDrink) {

    return this._drinksService.queryDrinkCreate(payload).pipe(tap(drink => {
      ctx.dispatch(new FetchAllDrinks());
    }))
  }

  @Action(EditDrink)
  editDrink(ctx: StateContext<DrinksStateModel>, { payload }: EditDrink) {
    return this._drinksService.queryDrinkUpdate(payload.id, payload).pipe(tap(drink => {
      ctx.dispatch(new FetchAllDrinks());
    }))
  }

  @Action(DeleteDrink)
  removeDrink(ctx: StateContext<DrinksStateModel>, action: DeleteDrink) {
    const { drinks } = ctx.getState();
    ctx.patchState({
      drinks: drinks.filter(drink => drink.id !== action.id)
    });
  }
}
