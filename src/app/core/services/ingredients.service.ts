import { Injectable } from '@angular/core';
import { PaginationResponse } from 'src/app/core/models/response.interface';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IDictionary } from '@core/models/dictionary';
import { IQueryParams } from '@core/models/pagination-query';

@Injectable({ providedIn: 'root' })

export class IngredientsService {
    private _apiUrl = environment.serverUrl;
    private path = `${this._apiUrl}/ingredients`;

    constructor(
        private _http: HttpClient
    ) { }

    getIngredientsList(params?: Partial<IQueryParams<IDictionary>>): Observable<PaginationResponse<IDictionary[]>> {
        return this._http.get<PaginationResponse<IDictionary[]>>(this.path, { params })
    }

    createIngredient(data: any): Observable<any> {
        return this._http.post<any[]>(this.path, data);
    }
}
