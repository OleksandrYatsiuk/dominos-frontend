import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RootService } from './root.service';
import { AuthService } from 'src/app/auth/auth.service';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUserSubject = new BehaviorSubject<any>(null);
  private userLocation = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();
  location = this.userLocation.asObservable();
  constructor(private http: AuthService) { }

  public serCurrentUser() {
    if (this.isAuthorized()) {
      this.http.current().pipe(pluck('result')).subscribe(user => {
        this.currentUserSubject.next(user);
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

  public isAuthorized(){
    return localStorage.getItem('auth')?true:false;
  }

}
