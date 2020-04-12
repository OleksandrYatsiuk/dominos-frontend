import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RootService } from './root.service';
import { AuthService } from 'src/app/auth/auth.service';
import { pluck } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUserSubject = new BehaviorSubject<any>(null);
  private userLocation = new BehaviorSubject<any>(null);
  private userRole = new BehaviorSubject<any>("public");
  currentUser = this.currentUserSubject.asObservable();
  location = this.userLocation.asObservable();
  role = this.userRole.asObservable();
  constructor(private http: AuthService,
    private permissionsService: NgxPermissionsService) { }

  public setCurrentUser() {
    if (this.isAuthorized()) {
      this.http.current().pipe(pluck('result')).subscribe(user => {
        this.currentUserSubject.next(user);
        this.permissionsService.loadPermissions([user['role']])
      })
    }
  }
  public saveGeoPosition(coords) {
    this.userLocation.next({
      position: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    })
  }

  public isAuthorized() {
    return localStorage.getItem('auth') ? true : false;
  }

}
