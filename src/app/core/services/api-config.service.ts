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

  private config: ConfigModel;

  constructor(private http: RootService) { }

  public getConfig(): ConfigModel {
    return this.config;
  }

  public loadApiConfig(): Promise<any> {
    return this.http.get('/config')
      .pipe(pluck('result'))
      .toPromise()
      .then(data => this.config = data);
  }

  public getError(code: number, attrs: string | { [key: string]: string | number }): string {
    if (!this.config.errors[code]) {
      return 'Unknown error';
    }

    if (typeof attrs === 'string') {
      return this.config.errors[code].replace(`{attr}`, `${attrs}`);
    }

    return Object.entries(attrs).reduce(
      (message: string, [key, value]) => message.replace(`{${key}}`, `${value}`),
      this.config.errors[code]
    );
  }

  public getParameter<T = number | string>(name: string): T {
    return this.config.params[name] as T;
  }

  public getStatuses<T = string>(name: string): T {
    return this.config.lists[name] as T;
  }

}
