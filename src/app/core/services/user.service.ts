import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserDataService } from 'src/app/auth/user-data.service';

export interface Credentials {
  // Customize received credentials here
  token: string;
  expiredAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private credentialsKey = 'auth';


  private currentUserSubject$ = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject$.asObservable();

  constructor(
    private http: UserDataService,
    private permissionsService: NgxPermissionsService
  ) { }

  public setCurrentUser() {
    if (this.isAuthorized()) {
      this.sendCurrentRequest().subscribe(user => {
        this.setCurrentUserData(user);
        this.permissionsService.loadPermissions([user['role']]);
      });
    }
  }

  public sendCurrentRequest(): Observable<object> {
    return this.http.current().pipe(pluck('result'));
  }

  public setCurrentUserData(user): void {
    this.currentUserSubject$.next(user);
  }

  public isAuthorized() {
    return this.authData() ? true : false;
  }

  public authData() {
    return localStorage.getItem(this.credentialsKey)
  }

  public setCredentials(data): void {
    localStorage.setItem(this.credentialsKey, data)
  }

  public removeCredentials(): void {
    localStorage.removeItem(this.credentialsKey)
  }

}
