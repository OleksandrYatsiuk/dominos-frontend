import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserService } from './user.service';
import { UserDataService } from 'src/app/module-auth/user-data.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  isBrowser: boolean;


  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private userService: UserService,
    private authService: UserDataService
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  private userLocation = new BehaviorSubject<any>(null);
  location = this.userLocation.asObservable();

  public updateUserLocation(coords) {
    this.authService.updateLocation({ lat: coords.latitude, lng: coords.longitude }).subscribe(res => this.userService.setCurrentUserData(res));
  }

  public askGeoLocation() {
    if (this.isBrowser) {
      navigator.geolocation.watchPosition(({ coords }) => {
        if (this.userService.isAuthorized()) {
          this.userService.currentUser.subscribe(user => {
            if (user) {
              if (Math.abs(user.location.lat - coords.latitude) > 1) {
                this.updateUserLocation(coords);
              }
            } else {
              this.saveGeoPosition(coords);
            }
          });
        } else {
          this.saveGeoPosition(coords);
        }
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
}
