import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams } from '@core/models/pagination-query';
import { environment } from '@environments/environment';
import { User } from 'src/app/module-auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  private _apiUrl = environment.serverUrl;

  path = `${this._apiUrl}/user-management`;
  constructor(private _http: HttpClient) { }

  public getUsers(params?: Partial<IQueryParams<User>>): any {
    return this._http.get(this.path, { params });
  }
  public deleteItem(id: string) {
    return this._http.delete(`${this.path}/${id}`);
  }
  public updateRole(id: string, data: any) {
    return this._http.put(`${this.path}/${id}`, data);
  }
}
