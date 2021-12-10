import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams } from '@core/models/pagination-query';
import { IPaginationResponse } from '@core/models/response.interface';
import { UserRoles } from '@core/models/user.model';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/module-auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  private _apiUrl = environment.nestServerUrl;
  private path = `${this._apiUrl}/users-management`;
  constructor(private _http: HttpClient) { }

  getUsers(params?: Partial<IQueryParams<User>>): Observable<IPaginationResponse<User[]>> {
    return this._http.get<IPaginationResponse<User[]>>(this.path, { params });
  }
  deleteItem(id: string): Observable<void> {
    return this._http.delete<void>(`${this.path}/${id}`);
  }
  updateRole(id: string, data: { role: UserRoles }): Observable<User> {
    return this._http.put<User>(`${this.path}/${id}/role`, data);
  }
}
