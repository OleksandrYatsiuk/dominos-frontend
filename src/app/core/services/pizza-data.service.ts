import { Injectable } from '@angular/core';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { PaginationResponse, BaseResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class PizzaDataService {
  private _apiUrl = environment.serverUrl;
  constructor(
    private http: HttpClient,
  ) { }
  private path = `${this._apiUrl}/pizza`;

  public getPizzas(options?: { page?: number, limit?: number, sort?: keyof Pizza }): Observable<PaginationResponse<Pizza[]>> {
    return this.http.get<PaginationResponse<Pizza[]>>(`${this.path}`, { params: options });
  }

  public getPizza(id: string): Observable<BaseResponse<Pizza>> {
    return this.http.get<BaseResponse<Pizza>>(`${this.path}/${id}`);
  }

  public remove(id: string): Observable<null> {
    return this.http.delete<null>(`${this.path}/${id}`);
  }

  // public create(data: Pizza): Observable<Pizza> {
  //   return this._root.postFromData(this.path, data).pipe(pluck('result'));
  // }

  // public edit(id: string, data: Pizza): Observable<Pizza> {
  //   return this._root.patchFromData(`${this.path}/${id}`, data).pipe(pluck('result'));
  // }
}
