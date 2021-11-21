import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddBasketItem, AddDrinkToBasket, AddPizzaToBasket, DeleteDrinkFromBasket, DeletePizzaFromBasket, FetchBasketFromStorage } from './basket.actions';

export interface BasketItem {
  id: string;
  price: string | number;
  size: string;
  count: number;
}

export interface BasketStateModel {
  drinks: BasketItem[],
  pizzas: BasketItem[],
  generalSumma: number;
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    drinks: [],
    pizzas: [],
    generalSumma: 0
  }
})
@Injectable()
export class BasketState {
  private _key = 'basket2';
  constructor(private _storageService: StorageService) {

  }

  @Selector()
  public static getState(state: BasketStateModel) {
    return state;
  }

  @Selector()
  static selectedDrink(id: string) {
    return createSelector([BasketState], (state: any) => {
      return state.basket.drinks.filter(drink => drink.id === id);
    })
  }

  @Selector()
  static selectedPizza(id: string) {
    return createSelector([BasketState], (state: any) => {
      return state.basket.pizzas.filter(pizza => pizza.id === id);
    })
  }

  @Selector()
  static generalSumma(state: BasketStateModel): number {
    const { drinks, pizzas } = state;
    function calculateItemsSumma(items: BasketItem[]): string {
      let drinkSumma = 0;
      items?.forEach(el => drinkSumma += +el.price * el.count);
      return Number.parseFloat(drinkSumma.toString()).toFixed(2);
    }

    const drinksSumma = calculateItemsSumma(drinks);
    const pizzasSumma = calculateItemsSumma(pizzas);
    return (Number(drinksSumma) + Number(pizzasSumma)) || 0;
  }

  @Selector()
  static generalCount(state: BasketStateModel): number {
    const { drinks, pizzas } = state;
    function calculateItemsCount(items: BasketItem[]): number {
      let value = 0;
      items?.forEach(el => value += +el.count);
      return value;
    }
    const drinksCount = calculateItemsCount(drinks);
    const pizzasCount = calculateItemsCount(pizzas);
    return drinksCount + pizzasCount;
  }

  @Action(AddPizzaToBasket)
  addPizza({ dispatch }: StateContext<BasketStateModel>, { payload, size }: AddPizzaToBasket) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size],
      count: 1
    }
    dispatch(new AddBasketItem(item, 'pizzas', 1));
  }

  @Action(AddDrinkToBasket)
  addDrink({ dispatch }: StateContext<BasketStateModel>, { payload, size }: AddDrinkToBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1
    }
    dispatch(new AddBasketItem(item, 'drinks', 1));
  }

  @Action(DeleteDrinkFromBasket)
  deleteDrink({ dispatch }: StateContext<BasketStateModel>, { payload, size }: DeleteDrinkFromBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1
    }
    dispatch(new AddBasketItem(item, 'drinks', -1));
  }


  @Action(DeletePizzaFromBasket)
  deletePizza({ dispatch }: StateContext<BasketStateModel>, { payload, size }: DeletePizzaFromBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1
    }
    dispatch(new AddBasketItem(item, 'pizzas', -1));
  }

  @Action(FetchBasketFromStorage)
  fetchStorage({ setState }: StateContext<BasketStateModel>) {
    const storage = this._storageService.getItem(this._key);
    if (storage) { setState({ ...storage }); }
  }

  @Action(AddBasketItem)
  public add({ getState, setState }: StateContext<BasketStateModel>, { payload, type, direction }: AddBasketItem) {
    const state = getState();

    const index = state[type].findIndex(item => item.id === payload.id && item.size === payload.size);
    const items = state[type].filter((item, idx) => index !== idx);

    if (index !== -1) {
      const item = state[type][index];
      const count = item.count + direction;
      setState({ ...state, [type]: [...items, ...(count === 0 ? [] : [{ ...item, count }])] });
    } else {
      setState({ ...state, [type]: [...items, ...[payload]] });
    }

    this._storageService.setItem(this._key, getState());
  }


}
