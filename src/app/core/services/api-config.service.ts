import { Injectable } from '@angular/core';
import { RootService } from './root.service';
import { pluck } from 'rxjs/operators';

export interface ConfigModel {
  params: {
    [key: string]: any;
  };
  errors: {
    [key: number]: string;
  };
  lists: {
    [key: number]: object;
  };
}

@Injectable({ providedIn: 'root' })
export class ApiConfigService {

  private _config: ConfigModel;

  constructor(private http: RootService) { }

  getConfig(): ConfigModel {
    return this._config;
  }

  loadApiConfig(): Promise<any> {
    return this.http.get('/config')
      .pipe(pluck('result'))
      .toPromise()
      .then(data => this._config = data);
  }

  getError(code: number, attrs: string | { [key: string]: string | number }): string {
    if (!this._config.errors[code]) {
      return 'Unknown error';
    }

    if (typeof attrs === 'string') {
      return this._config.errors[code].replace(`{attr}`, `${attrs}`);
    }

    return Object.entries(attrs).reduce(
      (message: string, [key, value]) => message.replace(`{${key}}`, `${value}`),
      this._config.errors[code]
    );
  }

  getParameter<T = number | string>(name: string): T {
    return this._config.params[name] as T;
  }

  getStatuses<T = string>(name: string): T {
    return this._config.lists[name] as T;
  }

}
