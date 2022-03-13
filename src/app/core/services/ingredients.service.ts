import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDictionary, IMultiLanguageDictionary } from '@core/models/dictionary';
import { IQueryParams } from '@core/models/pagination-query';

@Injectable({ providedIn: 'root' })

export class IngredientsService {
    constructor(
        private _http: HttpClient
    ) { }

    getIngredientsList(params?: Partial<IQueryParams<IDictionary>>): Observable<IMultiLanguageDictionary[]> {
        return this._http.get<IMultiLanguageDictionary[]>('/ingredients', { params })
    }

    createIngredient(data: any): Observable<any> {
        return this._http.post<any[]>('/ingredients', data);
    }
}
