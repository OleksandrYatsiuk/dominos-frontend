import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionDataService {
  public path = '/promotion';
  constructor(private http: RootService) {
  }
  public getData(options?: object) {
    return this.http.get(this.path, options);
  }

  public getItem(id: string) {
    return this.http.get(`${this.path}/${id}`);
  }

  public remove(id: string): Observable<null> {
    return this.http.delete(`${this.path}/${id}`);
  }

  public create(data: any) {
    return this.http.post(`${this.path}`, data);
  }
  public update(id: string) {
    return this.http.put(`${this.path}/${id}`);
  }
  public upload(id: string, file: FormData): Observable<any> {
    return this.http.post(`${this.path}/${id}`, file);
  }

}
