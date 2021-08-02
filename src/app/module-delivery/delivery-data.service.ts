import { Injectable } from '@angular/core';
import { Delivery } from './delivery.model';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../core/models/response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDataService {
  private _apiUrl = environment.serverUrl;
  constructor(private http: HttpClient) { }

  public create(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this._apiUrl}/delivery`, delivery);
  }
  public deliveryList(params?: object): Observable<PaginationResponse<Delivery[]>> {
    return this.http.get<PaginationResponse<Delivery[]>>(`${this._apiUrl}/delivery`, params);
  }
  public delete(id: string): Observable<null> {
    return this.http.delete<null>(`${this._apiUrl}/delivery`);
  }
}
