import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()

export class RootService {
  updatePizzaList = new BehaviorSubject(null);
  private serverUrl = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  changePassword(data): Observable<any> {
    return this.http.post<any>(`${this.serverUrl}/user/change-password`, data);
  }
  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.serverUrl}/user/profile`, data);
  }
  getIngredientsList(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/ingredients`);
  }
  getShops(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/shops`);
  }


  public post(path, body): Observable<any> {
    return this.http.post(`${this.serverUrl}${path}`, body);
  }

  public get(path: string, options?): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}${path}`, options);
  }
  public put(path: string, options?): Observable<any> {
    return this.http.put<any>(`${this.serverUrl}${path}`, options);
  }
  public patch(path: string, options?): Observable<any> {
    return this.http.patch<any>(`${this.serverUrl}${path}`, options);
  }
  public delete(path: string): Observable<any> {
    return this.http.delete<any>(`${this.serverUrl}${path}`);
  }


}
