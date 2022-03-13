import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPaginationResponse } from '../models/response.interface';
import { ModelPromotion, Promotion } from '../models/promotions/promotions.model';
import { HttpClient } from '@angular/common/http';
import { IPromotionPublic, ModelPromotionPublic } from '@core/models/promotions/promotions-public.model';
import { IQueryParams } from '@core/models/pagination-query';
import { transformToFormData } from 'src/utils/form-data';

@Injectable({
  providedIn: 'root'
})
export class PromotionDataService {

  private _path = '/promotions';
  private _public_path = '/public/promotions';
  constructor(private http: HttpClient) {
  }
  getData(params?: Partial<IQueryParams<ModelPromotion>>): Observable<IPaginationResponse<ModelPromotion[]>> {
    return this.http.get(this._path, { params })
      .pipe(
        map((response: IPaginationResponse<Promotion[]>) => {
          return { ...response, result: response.result.map(p => new ModelPromotion(p)) };
        }));
  }
  queryPromotionPublicList(params?: Partial<IQueryParams<ModelPromotionPublic>>): Observable<IPaginationResponse<ModelPromotionPublic[]>> {
    return this.http.get(this._public_path, { params }).pipe(
      map((response: IPaginationResponse<IPromotionPublic[]>) => ({ ...response, result: response.result.map(p => new ModelPromotionPublic(p)) }))
    );
  }

  getItem(id: string): Observable<ModelPromotion> {
    return this.http.get(`${this._path}/${id}`).pipe(map((p: Promotion) => new ModelPromotion(p)));
  }

  getPublicItem(id: string): Observable<ModelPromotionPublic> {
    return this.http.get(`${this._public_path}/${id}`).pipe(
      map((p: IPromotionPublic) => new ModelPromotionPublic(p)));
  }

  remove(id: string): Observable<null> {
    return this.http.delete<null>(`${this._public_path}/${id}`);
  }

  create(data: Promotion): Observable<Promotion> {
    const formData = transformToFormData(data);
    return this.http.post(`${this._path}`, formData).pipe(map(p => new ModelPromotion(p)));
  }
  update(id: string, data: Promotion): Observable<Promotion> {
    return this.http.patch<Promotion>(`${this._path}/${id}`, data);
  }
  upload(id: string, image: File): Observable<ModelPromotion> {
    const formData = transformToFormData({ image });
    return this.http.post(`${this._path}/upload/${id}`, formData).pipe(map(p => new ModelPromotion(p)));
  }

}
