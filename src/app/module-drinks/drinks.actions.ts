import { Drink } from "@core/models/drink/drink.interface";

export class AddDrink {
  public static readonly type = '[Drinks] Add drink';
  constructor(public payload: Drink) { }
}

export class EditDrink {
  static readonly type = '[Drinks] Edit';
  constructor(public payload: any) { }
}

export class FetchAllDrinks {
  static readonly type = '[Drinks] Fetch All';
}

export class DeleteDrink {
  static readonly type = '[Drinks] Delete';
  constructor(public id: string) { }
}