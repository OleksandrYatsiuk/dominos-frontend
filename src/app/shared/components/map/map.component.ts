import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// @ts-ignore
import { } from '@types/googlemaps';

import { pluck } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserDataService } from 'src/app/auth/user-data.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


export interface Location {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  public KYIV_COORDS: Location = {
    lat: 50.44966120868815,
    lng: 30.52501781267547
  };
  public data;
  origin: Location;
  destination: Location;

  public defaultImage = '../../../../assets/data/marker.png';
  public currentPosition: Location;

  public markerOptions = {
    origin: {
      draggable: true,
      opacity: 0,
      scaledSize: { width: 20, height: 20 }
    },
    destination: {
      label: 'marker label',
      opacity: 0,
    },
  };
  public renderOptions = {
    suppressMarkers: true,
  };
  distance: number;
  duration: number;
  markers: Marker[];
  travelMode = 'DRIVING';
  currentAddress = 'Choose start position';

  constructor(
    private modal: NgbActiveModal,
    private http: ShopService,
    private userService: UserService,
    private authService: UserDataService,
    private geolocation: GeolocationService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    if (!this.currentPosition) {
      this.currentPosition = this.KYIV_COORDS;
    }
    this.trackingPosition();
    this.setMarkers();
  }

  public close(data?: Marker): void {
    this.modal.close(data);
  }

  public dragEnd(event) {
    this.getAddress(event.coords);
    this.origin = event.coords;
    this.currentPosition = event.coords;
    this.travelMode = google.maps.TravelMode.DRIVING;
    document.querySelectorAll(`input[type='radio']`)[0]['checked'] = true;
    this.calculateTravelTime(this.destination, google.maps.TravelMode.DRIVING);
  }

  private getAddress(coords) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(coords.lat, coords.lng);
    geocoder.geocode({ location: latlng }, (result) => {
      const address = result.filter(el => el.types[0] === 'street_address');
      if (address[0]) {
        this.currentAddress = address[0].formatted_address;
      }
    });
  }
  public saveLocation() {
    if (this.userService.isAuthorized()) {
      this.authService.updateLocation(this.currentPosition)
        .subscribe(result => {
          this.notification.showSuccess('Position was updated successfully!');
        });
    }
  }

  private setMarkers() {
    this.http.getData()
      .pipe(pluck('result'))
      .subscribe(result => this.markers = result);
  }

  trackingPosition(): void {
    if (this.userService.isAuthorized()) {
      this.userService.currentUser.subscribe(user => {
        if (user && user.location.lat && user.location.lng) {
          this.currentPosition = user.location;
        } else {
          navigator.geolocation.watchPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            this.geolocation.saveGeoPosition(coords);
            this.currentPosition = { lat: latitude, lng: longitude };
          });
        }
      });
    } else {
      this.geolocation.location.subscribe(location => {
        if (location) {
          const { lat, lng } = location.position;
          this.currentPosition = { lat, lng };
        } else {
          this.geolocation.askGeoLocation();
          this.geolocation.location.subscribe();
        }
      });
    }
  }

  public mapReady(event): void {
    if (event) {
      this.getAddress(this.currentPosition);
    }
  }

  public clickedMarker(marker: Marker): void {
    this.createDirection({ lat: marker.lat, lng: marker.lng });
    document.querySelectorAll(`input[type='radio']`)[0]['checked'] = true;
    this.calculateDistance(marker);
    this.data = marker;
  }

  private createDirection(location: Location): void {
    this.origin = { lat: this.currentPosition.lat, lng: this.currentPosition.lng };
    this.destination = location;
    this.calculateTravelTime(location);
  }

  private calculateDistance(marker: Marker): void {
    this.distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(+this.currentPosition.lat, +this.currentPosition.lng),
      new google.maps.LatLng(marker.lat, marker.lng));
  }

  private calculateTravelTime(newPoint, travelMode = google.maps.TravelMode.DRIVING) {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng),
        destination: new google.maps.LatLng(newPoint),
        travelMode
      },
      ({ routes }) => {
        if (routes[0]) {
          this.distance = routes[0].legs[0].distance.value;
          this.duration = routes[0].legs[0].duration.value;
        }
      });
  }

  public change(event: any): void {
    this.currentPosition = { lat: event.lat(), lng: event.lng() };
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  address: string;
}


