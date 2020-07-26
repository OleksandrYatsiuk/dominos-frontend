import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { UserLogin, User } from './auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: RootService) { }

  public login(userLogin: UserLogin): Observable<any> {
    return this.http.post(`/auth/login`, userLogin);
  }

  changePassword(data): Observable<any> {
    return this.http.post(`/user/change-password`, data);
  }
  updateProfile(data: any): Observable<any> {
    return this.http.put(`/user/profile`, data);
  }

  public register(user: User): Observable<any> {
    return this.http.post(`/auth/register`, user);
  }

  public logout(): Observable<null> {
    return this.http.post(`/user/logout`, null);
  }
  public current(): Observable<null> {
    return this.http.get(`/updateLocationuser/current`);
  }

  public updateLocation(location: object): Observable<any> {
    return this.http.put(`/user/location`, location);
  }
  public confirm(hash: string): Observable<any> {
    return this.http.get(`/auth/confirm/${hash}`);
  }
}
