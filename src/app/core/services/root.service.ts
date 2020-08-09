import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()

export class RootService {
  updatePizzaList = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }
  getIngredientsList(page: any, limit: any, sort: string): Observable<any> {
    return this.http.get(`ingredients`, {
      params:
        { page, limit, sort }
    });
  }
  public createIngredient(data: any): Observable<any> {
    return this.http.post<any[]>(`ingredients`, data);
  }

  public post(path, body?): Observable<any> {
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


}
