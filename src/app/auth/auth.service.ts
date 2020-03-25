import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, User } from './auth.model';
import { RootService } from '../core/services/root.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: RootService) { }

  public login(userLogin: UserLogin): Observable<any> {
    return this.http.post(`/user/login`, userLogin);
  }

  public register(user: User): Observable<any> {
    return this.http.post(`/user/register`, user)
  }

  public logout(): Observable<null> {
    return this.http.post(`/user/logout`, null)
  }
}
