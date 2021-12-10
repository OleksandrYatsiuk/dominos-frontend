import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IShop } from '@core/models/shop.interface';
import { GeolocationService } from '@core/services/geolocation.service';
import { MapService } from '@core/services/map.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy {
  isBrowser: boolean;
  markers: IShop[];
  private _selectedMarker: IShop;

  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private _ms: MapService,
    private _cd: ChangeDetectorRef,
    private _gs: GeolocationService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  ngOnDestroy(): void {
    this._ms.destroy();
  }

  ngOnInit(): void {

    if (this.isBrowser) {
      this._ms.initMap('delivery', {});
      this._initMarkers(this._config.data.shops);

    }
    this._gs.location
      .pipe(pluck('position'))
      .subscribe(loc => {
        this._ms.addMarker({ ...loc, icon: 'map-blue-small.svg', address: 'You are here!', coords: loc });
        this._cd.detectChanges();
      });

  }

  private _initMarkers(m: IShop[]): void {
    m.forEach(marker => this._ms.addMarker({ ...marker, address: null })
      .on('click', () => {
        this._ms.selectMarker(marker.id);
        this._selectedMarker = marker;
      }));
  }
  save(): void {
    this._ref.close(this._selectedMarker);
  }
  close(): void {
    this._ref.destroy();
  }

}
