import { Injectable } from '@angular/core';
import { RootService } from '../core/services/root.service';
import { Observable } from 'rxjs';
import { BaseResponse } from '../core/models/response.interface';
import { Promotion } from './promotion-create/promotions.interface';

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

  public create(data: Promotion): Observable<BaseResponse<Promotion>> {
    const formData = this.getFormData(data);
    return this.http.post(`${this.path}`, formData);
  }
  public update(id: string, data: Promotion): Observable<BaseResponse<Promotion>> {
    const formData = this.getFormData(data);
    return this.http.patch(`${this.path}/${id}`, formData);
  }
  public upload(id: string, file: FormData): Observable<any> {
    return this.http.post(`${this.path}/${id}`, file);
  }

  private getFormData(context: Promotion): FormData {
    const formData = new FormData();

    Object.entries(context)
      .filter(([param, value]) => value !== null)
      .forEach(([param, value]) => {
        formData.append(param, value);
      });
    return formData;
  }

}
