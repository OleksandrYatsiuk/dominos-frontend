import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserDataService } from 'src/app/module-auth/user-data.service';
import { isPlatformBrowser } from '@angular/common';
import { User } from 'src/app/module-auth/auth.model';

export interface Credentials {
  token: string;
  expiredAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isBrowser: boolean;

  private credentialsKey = 'auth';


  currentUserSubject$ = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject$.asObservable();

  constructor(
    @Inject(PLATFORM_ID) _pid: any,
    private http: UserDataService,
    private permissionsService: NgxPermissionsService
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  public setCurrentUser(): void {
    if (this.isAuthorized()) {
      this.sendCurrentRequest().subscribe(user => {
        this.setCurrentUserData(user);
        this.permissionsService.loadPermissions([user['role']]);
      });
    }
  }

  public sendCurrentRequest(): Observable<User> {
    return this.http.current();
  }

  public setCurrentUserData(user: any): void {
    this.currentUserSubject$.next(user);
  }

  public isAuthorized(): boolean {
    return this.authData() ? true : false;
  }

  public authData(): string {
    if (this.isBrowser) {
      return localStorage.getItem(this.credentialsKey)
    }
  }

  public setCredentials(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.credentialsKey, token)
    }
  }

  public removeCredentials(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.credentialsKey)
    }
  }

}
