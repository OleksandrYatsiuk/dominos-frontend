import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseResponse, PaginationResponse } from '../models/response.interface';
import { ModelPromotion, Promotion } from '../../module-admin-panel/module-promotions/components/promotion-create/promotions.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionDataService {

  private _apiUrl = environment.serverUrl;

  path = `${this._apiUrl}/promotion`;
  constructor(private http: HttpClient) {
  }
  public getData(options?: object): Observable<PaginationResponse<ModelPromotion[]>> {
    return this.http.get(this.path, options)
      .pipe(
        map((response: PaginationResponse<Promotion[]>) => {
          return { ...response, result: response.result.map(p => new ModelPromotion(p)) };
        }));
  }

  public getItem(id: string): Observable<BaseResponse<ModelPromotion>> {
    return this.http.get(`${this.path}/${id}`).pipe(
      map((p: BaseResponse<Promotion>) => ({ ...p, result: new ModelPromotion(p.result) })));
  }

  public remove(id: string): Observable<null> {
    return this.http.delete<null>(`${this.path}/${id}`);
  }

  public create(data: Promotion): Observable<BaseResponse<Promotion>> {
    const formData = this.getFormData(data);
    return this.http.post<BaseResponse<Promotion>>(`${this.path}`, formData);
  }
  public update(id: string, data: Promotion): Observable<BaseResponse<Promotion>> {
    const formData = this.getFormData(data);
    return this.http.patch<BaseResponse<Promotion>>(`${this.path}/${id}`, formData);
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
