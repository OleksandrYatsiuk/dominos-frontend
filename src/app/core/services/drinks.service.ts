import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(private _http: HttpClient) { }

  queryDrinksList(params?: any): Observable<any[]> {
    return this._http.get<any[]>('/drinks', { params });
  }

  queryDeleteDrink(id: string): Observable<null> {
    return this._http.delete<null>(`/drinks/${id}`);
  }
}
