import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PromotionsState, PromotionsStateModel } from './promotions.state';
<<<<<<< HEAD
import { FetchAllPromotions } from './promotions.actions';
=======
import { PromotionsAction } from './promotions.actions';
>>>>>>> master

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
<<<<<<< HEAD
      items: []
    };
    store.dispatch(new FetchAllPromotions());
    const actual = store.selectSnapshot(PromotionsState.promotions);
=======
      items: ['item-1']
    };
    store.dispatch(new PromotionsAction('item-1'));
    const actual = store.selectSnapshot(PromotionsState.getState);
>>>>>>> master
    expect(actual).toEqual(expected);
  });

});
