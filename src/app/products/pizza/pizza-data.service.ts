import { Injectable } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { PaginationResponse, BaseResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PizzaDataService {

  constructor(private http: RootService) { }

  public getPizzas(options?): Observable<PaginationResponse<Pizza[]>> {
    return this.http.get('/pizza', options);
  }

  public getPizza(id: string): Observable<BaseResponse<Pizza>> {
    return this.http.get(`/pizza/${id}`);
  }

  public remove(id: string): Observable<null> {
    return this.http.delete(`/pizza/${id}`);
  }

  public create(data: Pizza): Observable<BaseResponse<Pizza>> {
    return this.http.post('/pizza', data);
  }

  public upload(id: string, file: FormData): Observable<BaseResponse<Pizza>> {
    return this.http.post(`/pizza/${id}/upload`, file);
  }

  public edit(id: string, data: any): Observable<BaseResponse<Pizza>> {
    return this.http.put(`/pizza/${id}`, data);
  }
}
