import { Injectable } from '@angular/core';
import { UserLogin, User, AuthResponse, ChangePassword, GeoLocation, UpdateUserProfile } from './auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _nestUrl = environment.nestServerUrl;
  constructor(private _http: HttpClient) { }

  login(data: UserLogin): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._nestUrl}/auth/login`, data);
  }

  changePassword(data: ChangePassword): Observable<boolean> {
    return this._http.put<boolean>(`${this._nestUrl}/user/change-password`, data);
  }
  updateProfile(data: Partial<UpdateUserProfile>): Observable<User> {
    return this._http.patch<User>(`${this._nestUrl}/user/profile`, data)
  }

  register(user: Partial<User>): Observable<User> {
    return this._http.post<User>(`${this._nestUrl}/auth/register`, user);
  }

  logout(): Observable<void> {
    return this._http.post<void>(`${this._nestUrl}/user/logout`, {});
  }
  current(): Observable<User> {
    return this._http.get<User>(`${this._nestUrl}/user/current`);
  }

  updateLocation(data: GeoLocation): Observable<User> {
    return this._http.put<User>(`${this._nestUrl}/user/geolocation`, data);
  }
  updateImage(file: File): Observable<User> {
    const data = new FormData();
    data.append('file', file);
    return this._http.post<User>(`${this._nestUrl}/user/profile-image`, data)
  }

  // public confirm(hash: string): Observable<any> {
  //   return this._http.get(`${this._apiUrl}/auth/confirm/${hash}`);
  // }
}
