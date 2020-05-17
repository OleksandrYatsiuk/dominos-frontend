import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserDataService } from 'src/app/auth/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUserSubject = new BehaviorSubject<any>(null);
  private userLocation = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();
  location = this.userLocation.asObservable();

  constructor(
    private http: UserDataService,
    private permissionsService: NgxPermissionsService
  ) { }

  public setCurrentUser() {
    if (this.isAuthorized()) {
      this.http.current().pipe(pluck('result')).subscribe(user => {
        this.currentUserSubject.next(user);
        user ? this.permissionsService.loadPermissions([user['role']]) : false;
      });
    }
  }
  public saveGeoPosition(coords) {
    this.userLocation.next({
      position: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
  }

  public isAuthorized() {
    return localStorage.getItem('auth') ? true : false;
  }

}
