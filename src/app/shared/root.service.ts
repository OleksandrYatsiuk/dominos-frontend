import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PizzaList, Pizza } from './models/pizza.interface';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })

export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  private serverUrl = environment.serverURL;

  constructor(private http: HttpClient) {
  }
  fetchItems(): Observable<PizzaList[]> {
    return this.http.get<PizzaList[]>(`${this.serverUrl}/pizza`);
  }

  removeItem(id: string) {
    return this.http.delete(`${this.serverUrl}/pizza/${id}`);
  }
  createPizza(data: Pizza[]) {
    return this.http.post<any>(`${this.serverUrl}/pizza`, data);
  }
  updatePhoto(file: FormData, id: string) {
    return this.http.post<any>(`${this.serverUrl}/pizza/${id}`, file);
  }
  getIngredientsList() {
    return this.http.get<any[]>(`${this.serverUrl}/ingredients`);
  }

  login(user) {
    return this.http.post<any[]>(`http://localhost:1337/user/login`, {
      email: user.username,
      password: user.password
    });
  }
}
