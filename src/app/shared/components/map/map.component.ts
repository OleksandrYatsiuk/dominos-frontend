import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// @ts-ignore
import { } from '@types/googlemaps';
import { RootService } from 'src/app/core/services/root.service';
import { pluck } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { GeolocationService } from 'src/app/core/services/geolocation.service';

export interface location {
  lat: number,
  lng: number
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  public KYIV_COORDS: location = {
    lat: 50.450340,
    lng: 30.523435
  }
  origin: location;
  destination: location;

  defaultImage = '../../../favicon.ico';
  public currentPosition: location;

  public markerOptions = {
    origin: {
      draggable: true,
      opacity: 0,
      scaledSize: { width: 10, height: 10 }
    },
    destination: {
      label: 'marker label',
      opacity: 0,
    },
  }
  public renderOptions = {
    suppressMarkers: true,
  }
  distance: number;
  duration: number;
  markers: marker[];
  travelMode = "DRIVING"
  currentAddress = "Choose start position";

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: RootService,
    private userService: UserService,
    private geolocation: GeolocationService) { }

  ngOnInit(): void {
    if (!this.currentPosition) {
      this.currentPosition = this.KYIV_COORDS
    }
    this.trackingPosition();
    this.setMarkers();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public dragEnd(event) {
    this.getAddress(event.coords)
    this.origin = event.coords;
    this.currentPosition = event.coords;
    this.travelMode = google.maps.TravelMode.DRIVING;
    document.querySelectorAll('input[type="radio"]')[0]['checked'] = true;
    console.log(this.travelMode);
    this.calculateTravelTime(this.destination, google.maps.TravelMode.DRIVING)
  }

  private getAddress(coords) {
    let geocoder = new google.maps.Geocoder()
    var latlng = new google.maps.LatLng(coords.lat, coords.lng);
    geocoder.geocode({ location: latlng }, (result) => {
      const address = result.filter(el => el.types[0] === 'street_address')
      if (address[0]) {
        this.currentAddress = address[0].formatted_address;
      }
    })
  }

  private setMarkers() {
    this.http.getShops()
      .pipe(pluck('result'))
      .subscribe(result => this.markers = result)
  }

  trackingPosition(): void {
    if (this.userService.isAuthorized()) {
      this.userService.currentUser.subscribe(user => {
        if (user && user.location.lat && user.location.lng) {
          this.currentPosition = user.location;
        } else {
          navigator.geolocation.watchPosition(({ coords }) => {
            const { latitude, longitude } = coords;
            this.userService.saveGeoPosition(coords)
            this.currentPosition = { lat: latitude, lng: longitude }
          });
        }
      })
    } else {
      this.userService.location.subscribe(location => {
        if (location) {
          const { lat, lng } = location.position;
          this.currentPosition = { lat, lng }
        } else {
          this.geolocation.askGeoLocation()
          this.userService.location.subscribe();
        }
      });
    }
  }

  public mapReady(event): void {
    if (event) {
      this.getAddress(this.currentPosition);
    }
  }

  public clickedMarker(marker: marker): void {
    this.createDirection({ lat: marker.lat, lng: marker.lng });
    document.querySelectorAll('input[type="radio"]')[0]['checked'] = true;
    this.calculateDistance(marker)
    this.data = marker
  }

  private createDirection(location: location): void {
    this.origin = { lat: this.currentPosition.lat, lng: this.currentPosition.lng };
    this.destination = location;
    this.calculateTravelTime(location)
  }

  private calculateDistance(marker: marker): void {
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
        travelMode: travelMode
      },
      ({ routes }) => {
        this.distance = routes[0].legs[0].distance.value;
        this.duration = routes[0].legs[0].duration.value;
      })
  }

  public change(event: any): void {
    this.currentPosition = { lat: event.lat(), lng: event.lng() }
  }
  public setDrive() {
    this.travelMode = google.maps.TravelMode.DRIVING
    this.calculateTravelTime(this.destination, google.maps.TravelMode.DRIVING)
  }
  public setWalking() {
    this.travelMode = google.maps.TravelMode.WALKING
    this.calculateTravelTime(this.destination, google.maps.TravelMode.WALKING)
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  address: string;
}

