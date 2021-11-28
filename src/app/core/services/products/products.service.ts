import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductsResponse, SearchProductsParams } from '@core/models/products/products.interface';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _apiUrl = environment.nestServerUrl;
  constructor(@Inject(HttpClient) private _http: HttpClient) { }

  queryProductsListByIds(body: SearchProductsParams): Observable<ProductsResponse> {
    return this._http.post<ProductsResponse>(`${this._apiUrl}/products`, body);
  }
}
