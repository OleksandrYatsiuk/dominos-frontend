import { Injectable } from '@angular/core';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { IPaginationResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { transformToFormData } from 'src/utils/form-data';

@Injectable({ providedIn: 'root' })

export class PizzaDataService {

  constructor(private http: HttpClient) { }

  getPizzas(options?: { page?: number, limit?: number, sort?: keyof Pizza }): Observable<IPaginationResponse<Pizza[]>> {
    return this.http.get<IPaginationResponse<Pizza[]>>(`/pizzas`, { params: options });
  }

  getPizza(id: string): Observable<Pizza> {
    return this.http.get<Pizza>(`/pizzas/${id}`);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`/pizzas/${id}`);
  }

  create(data: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>('/pizzas', transformToFormData(data));
  }

  edit(id: string, data: Pizza): Observable<Pizza> {
    return this.http.patch<Pizza>(`/pizzas/${id}`, transformToFormData(data));
  }
}
