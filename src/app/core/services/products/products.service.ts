import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductsResponse, SearchProductsParams } from '@core/models/products/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(@Inject(HttpClient) private _http: HttpClient) { }

  queryProductsListByIds(body: SearchProductsParams): Observable<ProductsResponse> {
    return this._http.post<ProductsResponse>('/products', body);
  }
}
