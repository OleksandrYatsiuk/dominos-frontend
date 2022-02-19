import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@core/models/response.interface';
import { IShop } from '@core/models/shop.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private _apiUrl2 = environment.nestServerUrl;

  private _apiGetList = `${this._apiUrl2}/shops`;

  constructor(private _http: HttpClient) { }
  public path = `${this._apiUrl2}/shops`;


  queryShopsList(params?: any): Observable<PaginationResponse<IShop[]>> {
    return this._http.get<PaginationResponse<IShop[]>>(this._apiGetList, { params });
  }

  public remove(id: string): Observable<null> {
    return this._http.delete<null>(`${this.path}/${id}`);
  }
}
