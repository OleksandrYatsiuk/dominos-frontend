import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IShop } from '@core/models/shop.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  private _apiUrl = environment.serverUrl;
  private _apiUrl2 = environment.nestServerUrl;

  private _apiGetList = `${this._apiUrl2}/drinks`;

  constructor(private _http: HttpClient) { }
  public path = `${this._apiUrl}/drinks`;


  queryDrinksList(params?: any): Observable<any[]> {
    return this._http.get<any[]>(this._apiGetList, { params });
  }

  queryDeleteDrink(id: string): Observable<null> {
    return this._http.delete<null>(`${this.path}/${id}`);
  }
}
