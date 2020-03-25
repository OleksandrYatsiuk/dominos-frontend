import { RootService } from '../../../core/services/root.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class PizzaOverviewDataService {
  constructor(private http: RootService) { }

  public get(id: number): Observable<any> {
    return this.http.get(`/pizza/${id}`).pipe(pluck('result'));
  }
}
