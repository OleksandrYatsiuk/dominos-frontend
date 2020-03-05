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

  removeItem(id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}/pizza/${id}`);
  }
  createPizza(data: Pizza[]): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/pizza`, data);
  }
  updatePhoto(file: FormData, id: string): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/pizza/${id}`, file);
  }
  getIngredientsList(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/ingredients`);
  }

  login(user): Observable<any> {
    return this.http.post<any[]>(`${this.serverUrl}/user/login`, {
      email: user.username,
      password: user.password
    });
  }

  register(user): Observable<any> {
    return this.http.post<any[]>(`${this.serverUrl}/user/registration`, {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.serverUrl}/user/logout`, null)
  }
}
