import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PizzaList, Pizza } from './models/pizza.interface';

@Injectable({ providedIn: 'root' })
export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
  }
  fetchItems(): Observable<PizzaList[]> {
    return this.http.get<PizzaList[]>('http://localhost:1337/pizza');
  }

  removeItem(id: number) {
    return this.http.delete(`http://localhost:1337/pizza/${id}`);
  }
  createPizza(data: Pizza[]) {
    return this.http.post<any>('http://localhost:1337/pizza', data);
  }
  getIngredientsList() {
    return this.http.get<any[]>('http://localhost:1337/ingredients');
  }
}
