import { Injectable } from '@angular/core';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementDataService {
  path = '/user-management';
  constructor(private http: RootService) { }

  public getUsers(params?:object) {
    return this.http.get(this.path, params);
  }
  public deleteItem(id: string) {
    return this.http.delete(`${this.path}/${id}`);
  }
  public updateRole(id: string, data: any) {
    return this.http.put(`${this.path}/${id}`, data);
  }
}
