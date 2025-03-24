import { IQueryParams } from '@core/models/pagination-query';
import { Promotion } from '@core/models/promotions/promotions.model';

export class FetchAllPromotions {
  static readonly type = '[Promotion] Fetch All Promotions';
  constructor(public payload?: Partial<IQueryParams<Promotion>>) {

  }
}

export class FetchSimplePromotion {
  static readonly type = '[Promotion] Fetch Simple Promotion';
  constructor(public id: string) { }
}