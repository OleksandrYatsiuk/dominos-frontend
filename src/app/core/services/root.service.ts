import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDictionary } from '../models/dictionary';
import { BaseResponse, PaginationResponse } from '../models/response.interface';


@Injectable()

export class RootService {
  updatePizzaList = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }
  getIngredientsList(params?: object): Observable<PaginationResponse<IDictionary[]>> {
    return this.http.get<PaginationResponse<IDictionary[]>>(`ingredients`, params);
  }

  createIngredient(data: any): Observable<any> {
    return this.http.post<any[]>(`ingredients`, data);
  }

  post(path: string, body?): Observable<any> {
    return this.http.post(`${path}`, body);
  }

  get(path: string, options?): Observable<any> {
    return this.http.get<any>(`${path}`, options);
  }
  put(path: string, options?): Observable<any> {
    return this.http.put<any>(`${path}`, options);
  }
  patch(path: string, options?): Observable<any> {
    return this.http.patch<any>(`${path}`, options);
  }
  delete(path: string): Observable<any> {
    return this.http.delete<any>(`${path}`);
  }

  postFromData(path, body?: any): Observable<any> {
    const formData = this.getFormData(body);
    return this.http.post(`${path}`, formData);
  }

  patchFromData(path, body?: any): Observable<any> {
    const formData = this.getFormData(body);
    return this.http.patch(`${path}`, formData);
  }


  private getFormData(raw: object): FormData {
    const formData = new FormData();

    Object.entries(raw)
      .filter(([param, value]) => value !== null)
      .forEach(([param, value]) => {
        if (Array.isArray(value)) {
          this.setArrayKeys(formData, param, value)
        } else if (typeof value == "object") {
          if (value instanceof File) {
            formData.append(param, value);
          } else {
            this.setObjectKeys(formData, param, value)
          }
        } else {
          formData.append(param, value);
        }
      });
    return formData;
  }

  private setArrayKeys(formData: FormData, param: string, array: string[]): void {
    array.forEach((el, index) => {
      formData.append(`${param}[${index}]`, el);
    })
  }

  private setObjectKeys(formData: FormData, param: string, object: object): void {

    for (const key in object) {
      formData.append(`${param}[${key}]`, object[key]);
    }
  }
}
