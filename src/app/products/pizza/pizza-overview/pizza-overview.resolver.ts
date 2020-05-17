import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PizzaDataService } from '../pizza-data.service';
import { pluck } from 'rxjs/operators';

@Injectable()
export class PizzaOverviewResolver implements Resolve<any> {
  constructor(private http: PizzaDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.getPizza(route.params.id).pipe(pluck('result'));
  }
}
