import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PizzaList, Pizza } from '../models/pizza.interface';
import { environment } from 'src/environments/environment';


@Injectable()

export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  private serverUrl = environment.serverURL;

  constructor(private http: HttpClient) {
  }
  fetchItems(): Observable<PizzaList[]> {
    return this.http.get<PizzaList[]>(`${this.serverUrl}/pizza`);
  }

  removeItem(id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/pizza/${id}`);
  }
  createPizza(data: Pizza[]): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/pizza`, data);
  }
  uploadPhoto(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/upload`, file);
  }
  getIngredientsList(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/ingredients`);
  }

  
  post(path, body): Observable<any> {
    return this.http.post(`${this.serverUrl}${path}`, body);
  }

  get(path): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}${path}`);
  }

}