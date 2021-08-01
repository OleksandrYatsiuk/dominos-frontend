import { Injectable } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { PaginationResponse, BaseResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class PizzaDataService {

  constructor(private http: RootService) { }
  private path = '/pizza'

  public getPizzas(options?: { page?: number, limit?: number, sort?: keyof Pizza }): Observable<PaginationResponse<Pizza[]>> {
    return this.http.get(this.path, { params: options });
  }

  public getPizza(id: string): Observable<BaseResponse<Pizza>> {
    return this.http.get(`${this.path}/${id}`);
  }

  public remove(id: string): Observable<null> {
    return this.http.delete(`${this.path}/${id}`);
  }

  public create(data: Pizza): Observable<Pizza> {
    return this.http.postFromData(this.path, data).pipe(pluck('result'));
  }

  public edit(id: string, data: Pizza): Observable<Pizza> {
    return this.http.patchFromData(`${this.path}/${id}`, data).pipe(pluck('result'));
  }
}
