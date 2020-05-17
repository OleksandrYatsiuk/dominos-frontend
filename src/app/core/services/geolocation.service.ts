import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserDataService } from 'src/app/auth/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private userService: UserService, private authService: UserDataService) { }


  public updateUserLocation(coords) {
    this.authService.updateLocation({ lat: coords.latitude, lng: coords.longitude }).subscribe(res => this.userService.setCurrentUser());
  }

  public askGeoLocation() {
    navigator.geolocation.watchPosition(({ coords }) => {
      if (this.userService.isAuthorized()) {
        this.userService.currentUser.subscribe(user => {
          if (user) {
            if (Math.abs(user.location.lat - coords.latitude) > 1) {
              this.updateUserLocation(coords);
            }
          } else {
            this.userService.saveGeoPosition(coords);
          }
        });
      } else {
        this.userService.saveGeoPosition(coords);
      }
    });
  }
}
