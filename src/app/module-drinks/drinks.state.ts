import { Injectable } from '@angular/core';
import { Drink } from '@core/models/drink/drink.interface';
import { DrinksService } from '@core/services/drinks.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { pluck, tap } from 'rxjs';
import { AddDrink, DeleteDrink, EditDrink, FetchAllDrinks } from './drinks.actions';

export interface DrinksStateModel {
  drinks: Drink[];
}

@State<DrinksStateModel>({
  name: 'drinks',
  defaults: {
    drinks: []
  }
})

@Injectable()
export class DrinksState {

  constructor(private _drinksService: DrinksService) {

  }

  @Selector()
  static drinks(state: DrinksStateModel) {
    return state.drinks;
  }

  @Action(FetchAllDrinks)
  getDrinks({ getState, setState }: StateContext<DrinksStateModel>) {
    return this._drinksService.queryDrinksList().pipe(pluck('result'), tap((drinks: Drink[]) => {
      const state = getState();
      setState({
        ...state,
        drinks,
      });
    }));
  }

  @Action(AddDrink)
  createDrink(ctx: StateContext<DrinksStateModel>, { payload }: AddDrink) {
    const drink = payload;
    ctx.patchState({
      drinks: [drink, ...ctx.getState().drinks]
    });
  }

  @Action(DeleteDrink)
  removeDrink(ctx: StateContext<DrinksStateModel>, action: DeleteDrink) {
    const { drinks } = ctx.getState();
    ctx.patchState({
      drinks: drinks.filter(drink => drink.id !== action.id)
    });
  }
}
