import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LangService } from './lang.service';

@Injectable({ providedIn: 'root' })

export class MapService {
    isBrowser: boolean;
    private _lf: any = null;
    private _map: L.Map;
    private _zoom = 11.5;
    private _markers: {
        marker: L.Marker;
        data: any;
    }[] = [];
    private _center: L.LatLngExpression = {
        lat: 50.44966120868815,
        lng: 30.52501781267547
    };

    constructor(
        @Inject(PLATFORM_ID) private _pid,
        private _ls: LangService
    ) {
        this.isBrowser = isPlatformBrowser(_pid);
        if (this.isBrowser) {
            this._lf = window.L;
        }
    }

    initMap(container: string, options?: Partial<L.MapOptions>,): L.Map {
        if (this.isBrowser) {
            this._map = this.map(container, {
                zoom: this._zoom,
                ...options,
                center: options?.center ? options.center : this._center
            });
            this._initOpenStreetMap();
            return this._map;
        }

    }

    addMarker(item: any, options: L.MarkerOptions = {}, popupOptions?: L.Popup): L.Marker {
        const marker = this.marker(item.coords, {
            icon: this._getIcon(item?.icon || 'marker.svg'),
            draggable: false,
            ...options
        }).addTo(this._map);
        if (item?.address) {
            marker.bindPopup(item.address[this._ls.getLang()], { closeButton: false, className: 'marker-popup', ...popupOptions });
        }
        this._markers.push({ marker, data: item });
        return marker;
    }

    selectMarker(id: string): void {
        const index = this._markers.findIndex(m => m.data.id === id);
        this._markers.forEach(m => m.marker.setIcon(this._getIcon(m?.data?.icon || 'marker.svg')));
        if (index !== -1) {
            const marker = this._markers[index].marker;
            const item = this._markers[index].data;
            marker.setIcon(this._getIcon(item?.selectedIcon || 'marker.svg')).openPopup();
            if (item?.centerOnClick) {
                this._map.flyTo(marker.getLatLng());
            }
        }
    }

    clearMarkers(): void {
        this._markers.forEach(m => {
            m.marker.remove();
        });
        this._markers = [];
    }

    getMarkers(): { marker: L.Marker; data: any }[] {
        return this._markers;
    }

    getMap(): L.Map {
        return this._map;
    }

    destroy(): void {
        if (this._map) {
            this._map.remove();
            this._map = null;
        }
        if (this._markers?.length) {
            this._markers = [];
        }

    }

    /**
     * implement other methods for building map logic.
     * DO NOT USE variable "L" for creating new instances
     */

    map(element: string | HTMLElement, options?: L.MapOptions): L.Map {
        return this._lf.map(element, options);
    }
    marker(latlng: L.LatLngExpression, options?: L.MarkerOptions): L.Marker {
        return this._lf.marker(latlng, options);
    }
    icon(options: L.IconOptions): L.Icon {
        return this._lf.icon(options);
    }
    popup(options?: L.PopupOptions, source?: L.Layer): L.Popup {
        return this._lf.popup(options, source);
    }

    private _initOpenStreetMap(): void {
        this._lf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);
    }

    private _getIcon(icon: string = 'marker.svg'): L.Icon {
        return this.icon({ iconUrl: `../../../assets/icons/${icon}` });
    }

}
