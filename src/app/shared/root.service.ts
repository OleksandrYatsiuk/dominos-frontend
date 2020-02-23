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
    return this.http.get<PizzaList[]>('https://my-dominos.herokuapp.com/pizza');
  }

  removeItem(id: number) {
    return this.http.delete(`https://my-dominos.herokuapp.com/pizza/${id}`);
  }
  createPizza(data: Pizza[]) {
    return this.http.post<any>('https://my-dominos.herokuapp.com/pizza', data);
  }
  getIngredientsList() {
    return this.http.get<any[]>('https://my-dominos.herokuapp.com/ingredients');
  }
}
