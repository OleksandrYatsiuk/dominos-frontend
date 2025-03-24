import { Pizza } from "@core/models/pizza.interface";
import { QuerySearchPizzas } from "@core/models/pizza/pizza.interface";

export class FetchAllPizzas {
  public static readonly type = '[Pizzas] Get all items';
  constructor(public payload?: Partial<QuerySearchPizzas>) { }
}

export class GetPizzaItem {
  public static readonly type = '[Pizzas] Get item';
  constructor(public payload: string) { }
}

export class CreateNewPizza {
  public static readonly type = '[Pizzas] Create item';
  constructor(public payload: Pizza) { }
}

export class UpdatePizza {
  public static readonly type = '[Pizzas] Update item';
  constructor(public payload: Pizza) { }
}

export class DeletePizza {
  public static readonly type = '[Pizzas] Delete item';
  constructor(public id: string) { }
}