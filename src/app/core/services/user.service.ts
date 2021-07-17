import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserDataService } from 'src/app/auth/user-data.service';
import { inject } from '@angular/core/testing';
import { isPlatformBrowser } from '@angular/common';

export interface Credentials {
  // Customize received credentials here
  token: string;
  expiredAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isBrowser: boolean;

  private credentialsKey = 'auth';


  private currentUserSubject$ = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject$.asObservable();

  constructor(
    @Inject(PLATFORM_ID) _pid: any,
    private http: UserDataService,
    private permissionsService: NgxPermissionsService
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

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
    if (this.isBrowser) {
      return localStorage.getItem(this.credentialsKey)
    }
  }

  public setCredentials(data): void {
    if (this.isBrowser) {
      localStorage.setItem(this.credentialsKey, data)
    }
  }

  public removeCredentials(): void {
    if (this.isBrowser) {

      localStorage.removeItem(this.credentialsKey)
    }
  }

}
