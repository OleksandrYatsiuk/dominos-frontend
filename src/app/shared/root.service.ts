import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PizzaList, Pizza } from './models/pizza.interface';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }
  fetchItems(): Observable<PizzaList[]> {
    return this.http.get<PizzaList[]>(`${environment.serverURL}/pizza`);
  }

  removeItem(id: string) {
    return this.http.delete(`${environment.serverURL}/pizza/${id}`);
  }
  createPizza(data: Pizza[]) {
    return this.http.post<any>(`${environment.serverURL}/pizza`, data);
  }
  updatePhoto(file: FormData, id: string) {
    return this.http.post<any>(`${environment.serverURL}/pizza/${id}`, file);
  }
  getIngredientsList() {
    return this.http.get<any[]>(`${environment.serverURL}/ingredients`);
  }
}
