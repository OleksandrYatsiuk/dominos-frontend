import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PizzasState, PizzasStateModel } from './pizzas.state';
import { PizzasAction } from './pizzas.actions';

describe('Pizzas store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PizzasState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: PizzasStateModel = {
      items: ['item-1']
    };
    store.dispatch(new PizzasAction('item-1'));
    const actual = store.selectSnapshot(PizzasState.getState);
    expect(actual).toEqual(expected);
  });

});
