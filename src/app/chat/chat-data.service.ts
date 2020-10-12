import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {

  constructor(private http: RootService) { }
  public path = '/rooms'
  public getItem(id: string): Observable<any> {
    return this.http.get(`${this.path}/${id}`).pipe(pluck('result'));
  }
  public getData(params): Observable<any> {
    return this.http.get(`${this.path}`, { params }).pipe(pluck('result'));
  }
}
