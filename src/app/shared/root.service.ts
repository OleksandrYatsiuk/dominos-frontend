import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PizzaList, Pizza } from './models/pizza.interface';

const url = 'https://my-dominos.herokuapp.com';

@Injectable({ providedIn: 'root' })
export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }
  fetchItems(): Observable<PizzaList[]> {
    return this.http.get<PizzaList[]>(`${url}/pizza`);
  }

  removeItem(id: string) {
    return this.http.delete(`${url}/pizza/${id}`);
  }
  createPizza(data: Pizza[]) {
    return this.http.post<any>(`${url}/pizza`, data);
  }
  updatePhoto(file: FormData, id: string) {
    return this.http.post<any>(`${url}/pizza/${id}`, file);
  }
  getIngredientsList() {
    return this.http.get<any[]>(`${url}/ingredients`);
  }
}
