import { Injectable } from '@angular/core';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Observable, of, pluck, tap } from 'rxjs';
import { FetchAllPromotions, FetchSimplePromotion } from './promotions.actions';

export interface PromotionsStateModel {
  promotions: ModelPromotionPublic[];
  promotion: ModelPromotionPublic | null;
}

@State<PromotionsStateModel>({
  name: 'promotions',
  defaults: {
    promotions: [],
    promotion: null
  }
})

@Injectable()
export class PromotionsState {

  constructor(private _promotionsService: PromotionDataService) {

  }

  @Selector()
  static promotions(state: PromotionsStateModel) {
    return state.promotions;
  }

  @Selector()
  static promotion(state: PromotionsStateModel) {
    return state.promotion;
  }

  @Selector()
  static promotionsWithoutActive(state: PromotionsStateModel) {
    return state.promotions.filter(p => p.id !== state.promotion.id);
  }

  @Action(FetchAllPromotions)
  getPromotions({ getState, setState }: StateContext<PromotionsStateModel>, { payload }: FetchAllPromotions) {
    const state = getState();
    return state.promotions.length > 0 ?
      of(state.promotions).pipe(tap(promotions => setState({ ...getState(), promotions })))
      : this._promotionsService.queryPromotionPublicList(payload).pipe(pluck('result'), tap((promotions: ModelPromotionPublic[]) => {
        setState({ ...getState(), promotions });
      }));
  }


  @Action(FetchSimplePromotion)
  getPromotion({ getState, setState }: StateContext<PromotionsStateModel>, { id }: FetchSimplePromotion): Observable<ModelPromotionPublic> {
    const state = getState();

    return state.promotions.length > 0 ?
      of(state.promotions.find(p => p.id === id)).pipe(tap(promotion => setState({ ...getState(), promotion })))
      : this._promotionsService.getPublicItem(id).pipe(tap(promotion => setState({ ...getState(), promotion }))
      )

  }
}
