import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private _pid: any) {
        this.isBrowser = isPlatformBrowser(this._pid);
    }

    getItem(key: string): any {
        if (this.isBrowser) {
            const result = localStorage.getItem(key);
            return result ? JSON.parse(result) : null
        }
    }

    setItem(key: string, value: any): void {
        if (this.isBrowser) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    setString(key: string, value: string): void {
        if (this.isBrowser) {
            localStorage.setItem(key, value);
        }
    }
}