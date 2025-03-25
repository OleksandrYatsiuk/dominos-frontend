import { Injectable } from '@angular/core';
import { Pizza } from '@core/models/pizza.interface';
import { PizzaDataService } from '@core/services/pizza-data.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { of, tap } from 'rxjs';
import { CreateNewPizza, DeletePizza, FetchAllPizzas, GetPizzaItem, UpdatePizza } from './pizzas.actions';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';

export interface PizzasStateModel {
  pizzas: Pizza[];
  pizza: Pizza | null;
}

@State<PizzasStateModel>({
  name: 'pizzas',
  defaults: {
    pizzas: [],
    pizza: null,
  }
})

@Injectable()
export class PizzasState {
  constructor(
    private pizzaDataService: PizzaDataService,
  ) { }

  @Selector()
  static pizzas(state: PizzasStateModel): Pizza[] {
    return state.pizzas
  }

  @Selector()
  static pizza(state: PizzasStateModel): Pizza | null {
    return state.pizza;
  }

  @Action(GetPizzaItem)
  getPizza(ctx: StateContext<PizzasStateModel>, { payload }: GetPizzaItem) {
    const stateModel = ctx.getState();

    const pizza = stateModel.pizzas.find(p => p.id === payload);

    const pizza$ = pizza ? of(pizza) : this.pizzaDataService.getPizza(payload);

    return pizza$.pipe(tap(pizza => { ctx.setState({ ...stateModel, pizza }); }))
  }

  @Action(FetchAllPizzas)
  getAllPizzas(ctx: StateContext<PizzasStateModel>, { payload }: FetchAllPizzas) {
    return this.pizzaDataService.getPizzas(payload)
      .pipe(tap((pizzas) => ctx.patchState({ pizzas: pizzas.result })));
  }

  @Action(CreateNewPizza)
  create(ctx: StateContext<PizzasStateModel>, { payload }: CreateNewPizza) {
    return this.pizzaDataService.create(payload)
      .pipe(tap((pizza) => {
        ctx.setState(patch({ pizza, pizzas: insertItem(pizza) }))
      }));
  }


  @Action(UpdatePizza)
  update(ctx: StateContext<PizzasStateModel>, { payload }: UpdatePizza) {
    return this.pizzaDataService.edit(payload.id, payload)
      .pipe(tap((pizza) => ctx.setState(patch({
        pizza,
        pizzas: updateItem((item) => item.id === pizza.id, pizza),
      }))
      ));

  }

  @Action(DeletePizza)
  delete(ctx: StateContext<PizzasStateModel>, payload: DeletePizza) {
    return this.pizzaDataService.remove(payload.id)
      .pipe(tap(() => {
        ctx.setState(patch({ pizzas: removeItem((item) => item.id === payload.id) }))
      }));
  }
}
