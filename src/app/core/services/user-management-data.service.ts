import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQueryParams } from '@core/models/pagination-query';
import { IPaginationResponse } from '@core/models/response.interface';
import { UserRoles } from '@core/models/user.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/module-auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  constructor(private _http: HttpClient) { }

  getUsers(params?: Partial<IQueryParams<User>>): Observable<IPaginationResponse<User[]>> {
    return this._http.get<IPaginationResponse<User[]>>('/users-management', { params });
  }
  deleteItem(id: string): Observable<void> {
    return this._http.delete<void>(`/users-management/${id}`);
  }
  updateRole(id: string, data: { role: UserRoles }): Observable<User> {
    return this._http.put<User>(`/users-management/${id}/role`, data);
  }
}
