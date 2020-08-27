import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

export class RootService {
  updatePizzaList = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }
  getIngredientsList(params?: object): Observable<any> {
    return this.http.get(`ingredients`, params);
  }
  public createIngredient(data: any): Observable<any> {
    return this.http.post<any[]>(`ingredients`, data);
  }

  public post(path:string, body?): Observable<any> {
    return this.http.post(`${path}`, body);
  }

  public get(path: string, options?): Observable<any> {
    return this.http.get<any>(`${path}`, options);
  }
  public put(path: string, options?): Observable<any> {
    return this.http.put<any>(`${path}`, options);
  }
  public patch(path: string, options?): Observable<any> {
    return this.http.patch<any>(`${path}`, options);
  }
  public delete(path: string): Observable<any> {
    return this.http.delete<any>(`${path}`);
  }

  public postFromData(path, body?: any): Observable<any> {
    const formData = this.getFormData(body);
    return this.http.post(`${path}`, formData);
  }

  public patchFromData(path, body?: any): Observable<any> {
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
          this.setObjectKeys(formData, param, value)
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
