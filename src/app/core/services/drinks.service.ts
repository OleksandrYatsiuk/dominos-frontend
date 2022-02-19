import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private _apiUrl2 = environment.nestServerUrl;

  private path = `${this._apiUrl2}/drinks`;

  constructor(private _http: HttpClient) { }


  queryDrinksList(params?: any): Observable<any[]> {
    return this._http.get<any[]>(this.path, { params });
  }

  queryDeleteDrink(id: string): Observable<null> {
    return this._http.delete<null>(`${this.path}/${id}`);
  }
}
