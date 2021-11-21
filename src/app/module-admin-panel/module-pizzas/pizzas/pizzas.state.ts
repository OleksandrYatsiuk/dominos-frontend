import { Injectable } from '@angular/core';
import { Pizza } from '@core/models/pizza.interface';
import { QuerySearchPizzas } from '@core/models/pizza/pizza.interface';
import { IPaginationResponse } from '@core/models/response.interface';
import { PizzaDataService } from '@core/services/pizza-data.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { of, pluck, tap } from 'rxjs';
import { CreateNewPizza, DeletePizza, FetchAllPizzas, GetPizzaItem, UpdatePizza } from './pizzas.actions';

export interface PizzasStateModel {
  pizzas: Pizza[];
  pizzasWithPagination: IPaginationResponse<Pizza[]> | null;
  pizza: Pizza | null,
}

@State<PizzasStateModel>({
  name: 'pizzas',
  defaults: {
    pizzas: [],
    pizza: null,
    pizzasWithPagination: null
  }
})

@Injectable()
export class PizzasState {
  constructor(private _pizzaDataService: PizzaDataService) { }

  @Selector()
  static pizzas(state: PizzasStateModel): Pizza[] {
    return state.pizzasWithPagination.result;
  }

  @Selector()
  static pizza(state: PizzasStateModel): Pizza | null {
    return state.pizza;
  }


  @Selector()
  static pizzasWithPagination(state: PizzasStateModel): Partial<IPaginationResponse<Pizza[]>> | null {
    return state.pizzasWithPagination;
  }

  @Action(GetPizzaItem)
  getPizza(ctx: StateContext<PizzasStateModel>, { payload }: GetPizzaItem) {
    const stateModel = ctx.getState();

    const pizza = stateModel.pizzas.find(p => p.id === payload);

    const pizza$ = pizza ? of(pizza) : this._pizzaDataService.getPizza(payload);

    return pizza$.pipe(tap(pizza => { ctx.setState({ ...stateModel, pizza }); }))
  }

  @Action(FetchAllPizzas)
  getAllPizzas({ getState, setState }: StateContext<PizzasStateModel>, { payload }: FetchAllPizzas) {
    return this._pizzaDataService.getPizzas(payload).pipe(tap(pizzas => {
      setState({ ...getState(), pizzas: pizzas.result, pizzasWithPagination: pizzas });
    }))
  }

  @Action(CreateNewPizza)
  create({ getState, setState, dispatch }: StateContext<PizzasStateModel>, { payload }: CreateNewPizza) {

    return this._pizzaDataService.create(payload).pipe(tap((pizza) => {
      const stateModel = getState();
      setState({ ...stateModel, pizza: pizza });
      dispatch(FetchAllPizzas)
    }));

  }


  @Action(UpdatePizza)
  update({ getState, setState, dispatch }: StateContext<PizzasStateModel>, { payload }: UpdatePizza) {

    return this._pizzaDataService.edit(payload.id, payload).pipe(tap((pizza) => {
      const stateModel = getState();
      setState({ ...stateModel, pizza: pizza });
      dispatch(FetchAllPizzas)
    }));

  }

  @Action(DeletePizza)
  delete({ getState, setState }: StateContext<PizzasStateModel>, { payload }: DeletePizza) {

    return this._pizzaDataService.remove(payload).pipe(tap(() => {
      const stateModel = getState();
      setState({
        ...stateModel, pizzasWithPagination: {
          ...stateModel.pizzasWithPagination,
          result: stateModel.pizzas.filter(p => p.id !== payload)
        }
      })
    }));
  }
}
