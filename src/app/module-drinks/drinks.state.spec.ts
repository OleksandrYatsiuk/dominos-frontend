import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { DrinksState, DrinksStateModel } from './drinks.state';
import { DrinksAction } from './drinks.actions';

describe('Drinks store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DrinksState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: DrinksStateModel = {
      items: ['item-1']
    };
    store.dispatch(new DrinksAction('item-1'));
    const actual = store.selectSnapshot(DrinksState.getState);
    expect(actual).toEqual(expected);
  });

});
