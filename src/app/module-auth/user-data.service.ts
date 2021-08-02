import { Injectable } from '@angular/core';
import { UserLogin, User } from './auth.model';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _apiUrl = environment.serverUrl;
  constructor(private _http: HttpClient) { }

  public login(userLogin: UserLogin): Observable<any> {
    return this._http.post(`${this._apiUrl}/auth/login`, userLogin);
  }

  public changePassword(data: any): Observable<any> {
    return this._http.post(`${this._apiUrl}/user/change-password`, data);
  }
  public updateProfile(data: any): Observable<any> {
    return this._http.put(`${this._apiUrl}/user/profile`, data)
  }

  public register(user: User): Observable<any> {
    return this._http.post(`${this._apiUrl}/auth/register`, user);
  }

  public logout(): Observable<any> {
    return this._http.post(`${this._apiUrl}/user/logout`, {});
  }
  public current(): Observable<any> {
    return this._http.get(`${this._apiUrl}/user/current`);
  }

  public updateLocation(location: object): Observable<any> {
    return this._http.put(`${this._apiUrl}/user/location`, location);
  }
  public updateImage(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    return this._http.post(`${this._apiUrl}/user/upload`, data).pipe(pluck('result'))
  }

  public confirm(hash: string): Observable<any> {
    return this._http.get(`${this._apiUrl}/auth/confirm/${hash}`);
  }
}
