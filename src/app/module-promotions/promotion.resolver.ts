import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { Observable } from 'rxjs';
import { PromotionDataService } from '../core/services/promotion-data.service';

@Injectable()
export class PromotionResolver implements Resolve<any> {
  constructor(private _http: PromotionDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModelPromotionPublic> {
    return this._http.getPublicItem(route.params.id);
  }
}
