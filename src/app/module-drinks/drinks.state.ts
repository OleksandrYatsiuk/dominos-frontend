import { Injectable } from '@angular/core';
import { DrinksCategory } from '@core/enums/drinks-categories.enum';
import { Drink } from '@core/models/drinks/drinks.model';
import { DrinksService } from '@core/services/drinks/drinks.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { mergeMap, of, tap } from 'rxjs';
import { AddDrink, DeleteDrink, EditDrink, FetchAllDrinks } from './drinks.actions';
import { IPaginationResponse } from '@core/models/response.interface';

export interface DrinksStateModel {
  drinks: Drink[];
  categories: SelectItem[],
  paginatedDrinks: IPaginationResponse<Drink[]>
}

@State<DrinksStateModel>({
  name: 'drinks',
  defaults: {
    drinks: [],
    paginatedDrinks: { page: 0, total: 0, result: [], limit: 0 },
    categories: Object.values(DrinksCategory)
      .filter(c => Number.isInteger(c))
      .map(c => ({ value: c, label: String(c) }))
  }
})

@Injectable()
export class DrinksState {

  constructor(private _drinksService: DrinksService) { }

  @Selector()
  static drinks(state: DrinksStateModel): Drink[] {
    return state.drinks;
  }

  @Selector()
  static drinkCategories(state: DrinksStateModel): SelectItem[] {
    return state.categories;
  }

  @Action(FetchAllDrinks)
  getDrinks({ getState, setState }: StateContext<DrinksStateModel>, { payload }: FetchAllDrinks) {
    return this._drinksService.queryDrinkList(payload).pipe(
      tap((drinks) => {
        const state = getState();
        setState({ ...state, drinks: drinks.result, paginatedDrinks: drinks });
      }));
  }

  @Action(AddDrink)
  createDrink(ctx: StateContext<DrinksStateModel>, { payload }: AddDrink) {
    payload.price = Object.entries(payload.price).filter(([key, value]) => value).map(([key, value]) => ({ [key]: value }))[0]
    payload.size = Object.entries(payload.size).filter(([key, value]) => value).map(([key, value]) => ({ [key]: value }))[0]

    return this._drinksService.queryDrinkCreate(payload);
  }

  @Action(EditDrink)
  editDrink(ctx: StateContext<DrinksStateModel>, { payload, file }: EditDrink) {
    return this._drinksService.queryDrinkUpdate(payload.id, payload).pipe(
      mergeMap(drink => file ? this._drinksService.queryDrinkImageUpload(payload.id, file) : of(drink)));
  }

  @Action(DeleteDrink)
  removeDrink(ctx: StateContext<DrinksStateModel>, action: DeleteDrink) {
    const { drinks } = ctx.getState();
    ctx.patchState({
      drinks: drinks.filter(drink => drink.id !== action.id)
    });
  }
}
