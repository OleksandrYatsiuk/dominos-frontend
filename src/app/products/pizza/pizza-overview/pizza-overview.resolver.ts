import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PizzaOverviewDataService } from './pizza-overview-data.service';

@Injectable()
export class PizzaOverviewResolver implements Resolve<any> {
  constructor(private pizzaData: PizzaOverviewDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.pizzaData.get(route.params.id);
  }
}
