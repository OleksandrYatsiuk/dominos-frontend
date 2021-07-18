import { Injectable } from '@angular/core';
import { RootService } from './root.service';
import { Observable } from 'rxjs';
import { PaginationResponse } from '@core/models/response.interface';
import { IShop } from '@core/models/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  constructor(private http: RootService) { }
  public path = "/shops";

  public queryShopsList(options?: any): Observable<PaginationResponse<IShop[]>> {
    return this.http.get(this.path, options);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
