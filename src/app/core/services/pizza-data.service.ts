import { Injectable } from '@angular/core';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { PaginationResponse, BaseResponse, IPaginationResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { transformToFormData } from 'src/utils/form-data';

@Injectable({ providedIn: 'root' })

export class PizzaDataService {

  constructor(private http: HttpClient) { }

  private pathNest = `${environment.nestServerUrl}/pizzas`;

  getPizzas(options?: { page?: number, limit?: number, sort?: keyof Pizza }): Observable<IPaginationResponse<Pizza[]>> {
    return this.http.get<IPaginationResponse<Pizza[]>>(`${this.pathNest}`, { params: options });
  }

  getPizza(id: string): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.pathNest}/${id}`);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.pathNest}/${id}`);
  }

  create(data: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.pathNest, transformToFormData(data));
  }

  edit(id: string, data: Pizza): Observable<Pizza> {
    return this.http.patch<Pizza>(`${this.pathNest}/${id}`, transformToFormData(data));
  }
}
