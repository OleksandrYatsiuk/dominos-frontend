import { RootService } from '../../../core/services/root.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class PizzaOverviewDataService {
  constructor(private http: RootService) { }

  public getItem(id: string): Observable<any> {
    return this.http.get(`/pizza/${id}`).pipe(pluck('result'));
  }
  public getItems(): Observable<any> {
    return this.http.get(`/pizza/`).pipe(pluck('result'));
  }
  public editItem(id: string, pizza: any): Observable<any> {
    return this.http.put(`/pizza/${id}`, pizza).pipe(pluck('result'));
  }
  public uploadImageItem(id: string, file: any): Observable<any> {
    return this.http.post(`/pizza/${id}/upload`, file).pipe(pluck('result'));
  }
  public deleteItem(id: string): Observable<any> {
    return this.http.delete(`/pizza/${id}`);
  }
}
