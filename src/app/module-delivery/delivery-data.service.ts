import { Injectable } from '@angular/core';
import { Delivery, Payment } from './delivery.model';
import { Observable, pluck } from 'rxjs';
import { PaginationResponse } from '../core/models/response.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDataService {
  private _apiUrl = environment.nestServerUrl;
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
  public createPayment(data: Payment): Observable<any> {
    return this.http.post('payments', data).pipe(pluck('result'));
  }
}
