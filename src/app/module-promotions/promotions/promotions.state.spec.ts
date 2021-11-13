import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PromotionsState, PromotionsStateModel } from './promotions.state';
import { PromotionsAction } from './promotions.actions';

describe('Promotions store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PromotionsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: PromotionsStateModel = {
      items: ['item-1']
    };
    store.dispatch(new PromotionsAction('item-1'));
    const actual = store.selectSnapshot(PromotionsState.getState);
    expect(actual).toEqual(expected);
  });

});
