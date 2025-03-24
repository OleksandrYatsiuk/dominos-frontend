import { Injectable } from '@angular/core';
import { UserLogin, User, AuthResponse, ChangePassword, GeoLocation, UpdateUserProfile } from './auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private _http: HttpClient) { }

  login(data: UserLogin): Observable<AuthResponse> {
    return this._http.post<AuthResponse>('/auth/login', data);
  }

  changePassword(data: ChangePassword): Observable<boolean> {
    return this._http.put<boolean>('/user/change-password', data);
  }
  updateProfile(data: Partial<UpdateUserProfile>): Observable<User> {
    return this._http.patch<User>('/user/profile', data)
  }

  register(user: Partial<User>): Observable<User> {
    return this._http.post<User>('/auth/register', user);
  }

  logout(): Observable<void> {
    return this._http.post<void>('/user/logout', {});
  }
  current(): Observable<User> {
    return this._http.get<User>('/user/current');
  }

  updateLocation(data: GeoLocation): Observable<User> {
    return this._http.put<User>('/user/geolocation', data);
  }
  updateImage(file: File): Observable<User> {
    const data = new FormData();
    data.append('file', file);
    return this._http.post<User>('/user/profile-image', data)
  }

  confirm(hash: string): Observable<any> {
    return this._http.get(`/auth/confirm/${hash}`);
  }
}
