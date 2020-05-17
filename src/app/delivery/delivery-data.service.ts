import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { Delivery } from './delivery.model';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../core/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDataService {

  constructor(private http: RootService) { }

  public create(delivery: Delivery): Observable<Delivery> {
    return this.http.post('/delivery', delivery);
  }
  public deliveryList(page: number, limit: number, sort: string): Observable<PaginationResponse<Delivery[]>> {
    return this.http.get('/delivery', {
      params: { page, limit, sort }
    });
  }
  public delete(id: string): Observable<null> {
    return this.http.delete(`/delivery/${id}`);
  }
}
