import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateDrinkBody, Drink, UpdateDrinkBody } from '@core/models/drinks/drinks.model';
import { IQueryParams } from '@core/models/pagination-query';
import { IPaginationResponse } from '@core/models/response.interface';
import { Observable } from 'rxjs';
import { transformToFormData } from 'src/utils/form-data';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  constructor(@Inject(HttpClient) private _http: HttpClient) { }


  queryDrinkList(params?: Partial<IQueryParams<Drink>>): Observable<IPaginationResponse<Drink[]>> {
    const options = {
      params: new HttpParams()
    }
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) {
        options.params = options.params.append(String(key), value as any);
      }
    });
    return this._http.get<IPaginationResponse<Drink[]>>(`/drinks`, options);
  }

  queryDrinkCreate(data: CreateDrinkBody): Observable<Drink> {
    const formData = transformToFormData(data);
    return this._http.post<Drink>('/drinks', formData);
  }

  queryDrinkImageUpload(id: Drink['id'], file: File): Observable<Drink> {
    const formData = transformToFormData({ file });
    return this._http.post<Drink>(`/drinks/${id}/upload`, formData);
  }

  queryDrinkUpdate(id: Drink['id'], data: UpdateDrinkBody): Observable<Drink> {
    return this._http.patch<Drink>(`/drinks/${id}`, data);
  }

  queryDrinkData(id: Drink['id']): Observable<Drink> {
    return this._http.get<Drink>(`/drinks/${id}`);
  }

  queryDrinkRemove(id: Drink['id']): Observable<void> {
    return this._http.delete<void>(`/drinks/${id}`);
  }
}
