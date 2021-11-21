import { Drink } from "@core/models/drinks/drinks.model";
import { Pizza } from "@core/models/pizza.interface";
import { BasketProductTypes } from "./basket.interface";
import { BasketItem } from "./basket.state";


export class AddPizzaToBasket {
  public static readonly type = '[Basket] Add pizza to basket';
  constructor(public payload: Pizza, public size: string) { }
}

export class AddDrinkToBasket {
  public static readonly type = '[Basket] Add drink to basket';
  constructor(public payload: Drink, public size: string) { }
}

export class DeleteDrinkFromBasket {
  public static readonly type = '[Basket] Delete drink from basket';
  constructor(public payload: Drink, public size: string) { }
}

export class DeletePizzaFromBasket {
  public static readonly type = '[Basket] Delete pizza from basket';
  constructor(public payload: Pizza, public size: string) { }
}

export class AddBasketItem {
  public static readonly type = '[Basket] Add basket item';
  constructor(public payload: BasketItem, public type: BasketProductTypes, public direction: number) { }
}

export class DeleteBasketItem {
  public static readonly type = '[Basket] Delete basket item';
  constructor(public payload: string) { }
}

export class RemoveBasket {
  public static readonly type = '[Basket] Remove basket';
  constructor(public payload: string) { }
}

export class FetchBasketFromStorage {
  public static readonly type = '[Basket] Fetch basket from local storage';
}