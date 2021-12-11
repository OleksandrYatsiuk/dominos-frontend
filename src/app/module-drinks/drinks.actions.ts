import { CreateDrinkBody, DrinksSearchQueryParams, UpdateDrinkBody } from '@core/models/drinks/drinks.model';

export class AddDrink {
  public static readonly type = '[Drinks] Add drink';
  constructor(public payload: CreateDrinkBody) { }
}

export class EditDrink {
  static readonly type = '[Drinks] Edit';
  constructor(public payload: UpdateDrinkBody, public file?: File) { }
}

export class FetchAllDrinks {
  static readonly type = '[Drinks] Fetch All';
  constructor(public payload?: Partial<DrinksSearchQueryParams>) { }

}

export class DeleteDrink {
  static readonly type = '[Drinks] Delete';
  constructor(public id: string) { }
}