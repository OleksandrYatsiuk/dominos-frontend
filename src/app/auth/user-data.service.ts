import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { UserLogin, User } from './auth.model';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: RootService) { }

  public login(userLogin: UserLogin): Observable<any> {
    return this.http.post(`/auth/login`, userLogin);
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post(`/user/change-password`, data);
  }
  public updateProfile(data: any): Observable<any> {
    return this.http.put(`/user/profile`, data)
  }

  public register(user: User): Observable<any> {
    return this.http.post(`/auth/register`, user);
  }

  public logout(): Observable<null> {
    return this.http.post(`/user/logout`);
  }
  public current(): Observable<any> {
    return this.http.get(`/user/current`);
  }

  public updateLocation(location: object): Observable<any> {
    return this.http.put(`/user/location`, location);
  }
  public updateImage(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    return this.http.post(`/user/upload`, data).pipe(pluck('result'))
  }

  public confirm(hash: string): Observable<any> {
    return this.http.get(`/auth/confirm/${hash}`);
  }
}
