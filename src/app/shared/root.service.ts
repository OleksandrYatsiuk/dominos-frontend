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
  uploadPhoto(file: FormData): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/upload`, file);
  }
  getIngredientsList(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/ingredients`);
  }

  login(user): Observable<any> {
    return this.http.post<any[]>(`${this.serverUrl}/user/login`, {
      username: user.username,
      password: user.password
    });
  }

  register(user): Observable<any> {
    return this.http.post<any[]>(`${this.serverUrl}/user/register`, {
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

  get(path): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}${path}`);
  }
}
