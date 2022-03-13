import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@core/models/response.interface';
import { IShop } from '@core/models/shop.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  constructor(private _http: HttpClient) { }

  queryShopsList(params?: any): Observable<PaginationResponse<IShop[]>> {
    return this._http.get<PaginationResponse<IShop[]>>('/shops', { params });
  }

  public remove(id: string): Observable<null> {
    return this._http.delete<null>(`/shops/${id}`);
  }
}
