import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPizzaCategories } from '@core/models/pizza/pizza-categories.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(@Inject(HttpClient) private _http: HttpClient) { }

  queryPizzaCategories(): Observable<IPizzaCategories[]> {
    return this._http.get<IPizzaCategories[]>('/pizza-statuses');
  }
}
