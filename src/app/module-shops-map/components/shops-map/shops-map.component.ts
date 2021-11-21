import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IShop } from '@core/models/shop.interface';
import { MapService } from '@core/services/map.service';
import { ShopService } from '@core/services/shop.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shops-map',
  templateUrl: './shops-map.component.html',
  styleUrls: ['./shops-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsMapComponent implements OnInit, OnDestroy {
  shops$: Observable<IShop[]>;
  selectedMarker: IShop;
  constructor(
    private _ms: MapService,
    private _ss: ShopService,
    private _cd: ChangeDetectorRef
  ) { }
  ngOnDestroy(): void {
    this._ms.destroy();
  }

  ngOnInit(): void {
    this._ms.initMap('shops', {});
    this._ss.queryShopsList().subscribe(shops => {
      this._initMarkers(shops);
      this._cd.detectChanges();
    })
  }

  onClose(): void {
    this.selectedMarker = null;
  }

  private _initMarkers(m: IShop[]): void {
    m.forEach(marker => this._ms.addMarker({ ...marker, centerOnClick: true })
      .on('click', () => {
        this._ms.selectMarker(marker.id);
        this.selectedMarker = marker;
        this._cd.detectChanges();

      }));
  }


}
