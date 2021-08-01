import { Injectable } from '@angular/core';
import { IQueryParams } from '@core/models/pagination-query';
import { User } from 'src/app/module-auth/auth.model';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  path = '/user-management';
  constructor(private http: RootService) { }

  public getUsers(params?: Partial<IQueryParams<User>>) {
    return this.http.get(this.path, { params });
  }
  public deleteItem(id: string) {
    return this.http.delete(`${this.path}/${id}`);
  }
  public updateRole(id: string, data: any) {
    return this.http.put(`${this.path}/${id}`, data);
  }
}
