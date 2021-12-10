import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserDataService } from 'src/app/module-auth/user-data.service';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { GeoLocation } from 'src/app/module-auth/auth.model';
import { Store } from '@ngxs/store';
import { UpdateGeoLocationAction } from 'src/app/module-auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  isBrowser: boolean;


  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private authService: UserDataService,
    private _store: Store
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  private userLocation = new BehaviorSubject<any>(null);
  location = this.userLocation.asObservable();

  public updateUserLocation(coords: GeoLocation) {
    this._store.dispatch(new UpdateGeoLocationAction(coords));
  }

  public askGeoLocation() {
    if (this.isBrowser) {
      navigator.geolocation.watchPosition(({ coords }) => {
        // if (this.userService.isAuthorized()) {
        // this.userService.currentUser.subscribe(user => {
        //   if (user) {
        //     if (Math.abs(user.location.lat - coords.latitude) > 1) {
        //       this.updateUserLocation(coords);
        //     }
        //   } else {
        //     this.saveGeoPosition(coords);
        //   }
        // });
        // } else {
        this.saveGeoPosition(coords);
        // }
      });
    }

  }


  saveGeoPosition({ latitude, longitude }: GeoLocation): void {
    this.userLocation.next({
      position: { lat: latitude, lng: longitude }
    });
  }
}
