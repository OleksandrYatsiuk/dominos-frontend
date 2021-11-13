export class FetchAllPromotions {
  static readonly type = '[Promotion] Fetch All Promotions';
}

export class FetchSimplePromotion {
  static readonly type = '[Promotion] Fetch Simple Promotion';
  constructor(public id: string) { }
}