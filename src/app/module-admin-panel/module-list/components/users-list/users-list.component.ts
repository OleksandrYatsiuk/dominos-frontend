import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/module-auth/auth.model';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  totalPages: number;
  currentPage = 1;
  rows = 10;
  users$: Observable<User[]>;
  cols: { field: string; header: string; }[];

  constructor(
    private _us: UserManagementDataService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService
  ) { }

  ngOnInit() {
    this.users$ = this._queryUserList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'role', header: 'Role' },
      { field: 'email', header: 'Email' },
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.users$ = this._queryUserList(this.currentPage);

  }

  onDelete(item: User): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this._us.deleteItem(item.id).subscribe(res => {
          this.users$ = this._queryUserList(this.currentPage);
          this._ms.add({ severity: 'success', detail: `User "${item.username}" was deleted successfully!` });
          this._cd.detectChanges();
        }, (e) => {
          this._ms.add({ severity: 'error', detail: e.result });
          this._cd.detectChanges();
        })
      }
    })
  }

  private _queryUserList(page: number): Observable<User[]> {
    return this._us.getUsers({ page, limit: this.rows, sort: 'email' }).pipe(
      tap(({ result, _meta }) => {
        this.currentPage = _meta.pagination.page;
        this.totalPages = _meta.pagination.total;
      }),
      pluck('result'));
  }
}
