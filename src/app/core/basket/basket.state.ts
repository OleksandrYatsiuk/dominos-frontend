import { Injectable } from '@angular/core';
import { Drink } from '@core/models/drinks/drinks.model';
import { Pizza } from '@core/models/pizza.interface';
import { ProductsResponse, SearchProductsParams } from '@core/models/products/products.interface';
import { ProductsService } from '@core/services/products/products.service';
import { StorageService } from '@core/services/storage.service';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { tap } from 'rxjs';
import { AddBasketItem, AddDrinkToBasket, AddPizzaToBasket, DeleteDrinkFromBasket, DeletePizzaFromBasket, FetchBasketFromStorage, FetchBasketsProducts } from './basket.actions';
import { BasketProductTypes } from './basket.interface';

export interface BasketItem {
  id: string;
  price: string | number;
  size: string;
  count: number;
  type: BasketProductTypes;
}

export interface BasketProductItem extends BasketItem {
  product: Pizza | Drink;
}

export interface BasketStateModel {
  items: {
    drinks: BasketItem[],
    pizzas: BasketItem[],
  }
  generalSumma: number;
  products: ProductsResponse;
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    generalSumma: 0,
    items: {
      drinks: [],
      pizzas: []
    },
    products: {
      drinks: [],
      pizzas: []
    }
  }
})
@Injectable()
export class BasketState {
  private _key = 'basket2';
  constructor(
    private _storageService: StorageService,
    private _productsService: ProductsService
  ) {

  }

  @Selector()
  public static getState(state: BasketStateModel) {
    return state;
  }

  @Selector()
  static selectedDrink(id: string) {
    return createSelector([BasketState], (state: { basket: BasketStateModel }) => {
      return state.basket.items.drinks.filter(drink => drink.id === id);
    })
  }

  @Selector()
  static selectedPizza(id: string) {
    return createSelector([BasketState], (state: { basket: BasketStateModel }) => {
      return state.basket.items.pizzas.filter(pizza => pizza.id === id);
    })
  }

  @Selector()
  static generalSumma(state: BasketStateModel): number {
    const { drinks, pizzas } = state.items;
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
    const { drinks, pizzas } = state.items;
    function calculateItemsCount(items: BasketItem[]): number {
      let value = 0;
      items?.forEach(el => value += +el.count);
      return value;
    }
    const drinksCount = calculateItemsCount(drinks);
    const pizzasCount = calculateItemsCount(pizzas);
    return drinksCount + pizzasCount;
  }

  @Selector()
  static basketItemsIds(state: BasketStateModel): SearchProductsParams {
    return {
      pizzas: state.items.pizzas.map(pizza => pizza.id),
      drinks: state.items.drinks.map(drink => drink.id)
    };
  }
  @Selector()
  static products(state: BasketStateModel): { drinks: BasketProductItem[], pizzas: BasketProductItem[] } {
    function concatProducts(items: BasketItem[], products: (Drink | Pizza)[]): BasketProductItem[] {
      return items.map(item => ({ ...item, product: products.find(product => product.id === item.id) }))
    }

    const drinks = concatProducts(state.items.drinks, state.products.drinks);
    const pizzas = concatProducts(state.items.pizzas, state.products.pizzas);

    return { drinks, pizzas };
  }

  @Selector()
  static items(state: BasketStateModel): { drinks: BasketItem[], pizzas: BasketItem[] } {
    return state.items;
  }

  @Action(AddPizzaToBasket)
  addPizza({ dispatch }: StateContext<BasketStateModel>, { payload, size }: AddPizzaToBasket) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size],
      count: 1,
      type: 'pizzas'
    }
    dispatch(new AddBasketItem(item, 1));
  }

  @Action(AddDrinkToBasket)
  addDrink({ dispatch }: StateContext<BasketStateModel>, { payload, size }: AddDrinkToBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1,
      type: 'drinks'
    }
    dispatch(new AddBasketItem(item, 1));
  }

  @Action(DeleteDrinkFromBasket)
  deleteDrink({ dispatch }: StateContext<BasketStateModel>, { payload, size }: DeleteDrinkFromBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1,
      type: 'drinks'
    }
    dispatch(new AddBasketItem(item, -1));
  }


  @Action(DeletePizzaFromBasket)
  deletePizza({ dispatch }: StateContext<BasketStateModel>, { payload, size }: DeletePizzaFromBasket
  ) {
    const item: BasketItem = {
      id: payload.id,
      size,
      price: payload.price[size].toString(),
      count: 1,
      type: 'pizzas'
    }
    dispatch(new AddBasketItem(item, -1));
  }

  @Action(FetchBasketFromStorage)
  fetchStorage(ctx: StateContext<BasketStateModel>) {
    const state = ctx.getState();
    const storage = this._storageService.getItem(this._key);
    if (storage) {
      ctx.setState({ ...state, items: storage });
    }
  }

  @Action(AddBasketItem)
  add({ getState, setState }: StateContext<BasketStateModel>, { payload, direction }: AddBasketItem) {
    const state = getState();
    const type = payload.type;
    const index = state.items[type].findIndex(item => item.id === payload.id && item.size === payload.size);
    const items = state.items[type].filter((item: BasketItem, idx: number) => index !== idx);

    if (index !== -1) {

      const item = state.items[type][index];
      const count = item.count + direction;
      const record = count === 0 ? null : { ...item, count };
      if (record) { items.splice(index, 0, record) }
      setState({ ...state, items: { ...state.items, [type]: items } });
    } else {
      setState({ ...state, items: { ...state.items, [type]: [...items, ...[payload]] } });
    }

    this._storageService.setItem(this._key, getState().items);
  }

  @Action(FetchBasketsProducts)
  getProductsFromBasket(ctx: StateContext<BasketStateModel>) {

    const state = ctx.getState();

    const params: SearchProductsParams = {
      pizzas: state.items.pizzas.map(pizza => pizza.id),
      drinks: state.items.drinks.map(drink => drink.id)
    }

    return this._productsService.queryProductsListByIds(params).pipe(tap(products => {
      ctx.setState({ ...state, products: products });
    }));
  }

}
