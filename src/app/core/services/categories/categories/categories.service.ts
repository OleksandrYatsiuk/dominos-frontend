import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPizzaCategories } from '@core/models/pizza/pizza-categories.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _apiUrl = `${environment.nestServerUrl}/pizza-statuses`;
  constructor(@Inject(HttpClient) private _http: HttpClient) { }

  queryPizzaCategories(): Observable<IPizzaCategories[]> {
    return this._http.get<IPizzaCategories[]>(this._apiUrl)
  }
}
