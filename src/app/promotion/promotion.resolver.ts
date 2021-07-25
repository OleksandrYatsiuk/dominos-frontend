import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ModelPromotion } from './promotion-create/promotions.interface';
import { PromotionDataService } from './promotion-data.service';

@Injectable()
export class PromotionResolver implements Resolve<any> {
  constructor(private http: PromotionDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModelPromotion> {
    return this.http.getItem(route.params.id).pipe(pluck('result'));
  }
}
