import { Injectable } from '@angular/core';
import { RootService } from './root.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  constructor(private http: RootService) { }
  public path = "/shops";

  public getData(options?): Observable<any> {
    return this.http.get(this.path, options);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
