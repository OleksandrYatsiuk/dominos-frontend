import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { IDictionary, IMultiLanguageDictionary } from '@core/models/dictionary';
import { IQueryParams } from '@core/models/pagination-query';

@Injectable({ providedIn: 'root' })

export class IngredientsService {
    private _apiUrl2 = environment.nestServerUrl;
    private _path = `${this._apiUrl2}/ingredients`;

    constructor(
        private _http: HttpClient
    ) { }

    getIngredientsList(params?: Partial<IQueryParams<IDictionary>>): Observable<IMultiLanguageDictionary[]> {
        return this._http.get<IMultiLanguageDictionary[]>(this._path, { params })
    }

    createIngredient(data: any): Observable<any> {
        return this._http.post<any[]>(this._path, data);
    }
}
