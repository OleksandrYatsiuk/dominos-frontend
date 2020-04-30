import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { Delivery } from './delivery.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryDataService {

  constructor(private http: RootService) { }

  public create(delivery: Delivery): Observable<Delivery> {
    return this.http.post('/delivery/create', delivery);
  }
  public deliveryList(page, perPage): Observable<Delivery[]> {
    return this.http.get(`/delivery?page=${page}&perPage=${perPage}`)
  }
  public delete(id: string): Observable<Delivery[]> {
    return this.http.delete(`/delivery/${id}`)
  }
}
