import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/module-auth/auth.model';
import { ConfirmService } from '@core/services/confirm.service';
import { catchError, EMPTY, filter, map, mergeMap, Observable } from 'rxjs';
import { pluck } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TableItem } from '@core/models/table.interface';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UsersListComponent implements OnInit {
  currentPage = 1;
  users$: Observable<User[]>;
  cols: TableItem[];

  constructor(
    private _us: UserManagementDataService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService,
    private _translateService: TranslateService
  ) { }

  ngOnInit() {
    this.users$ = this._queryUserList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#', sortable: true, style: { with: '100px' } },
      { field: 'username', header: 'labels.username', sortable: true },
      { field: 'fullName', header: 'labels.fullName', sortable: true },
      { field: 'role', header: 'labels.role', sortable: true },
      { field: 'email', header: 'labels.email', sortable: true },
      { field: 'options', header: 'labels.options', style: { with: '100px' } }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.users$ = this._queryUserList(this.currentPage);

  }

  onDelete(item: User): void {
    this._cs.delete().pipe(
      filter(result => result),
      mergeMap(() => this._us.deleteItem(item.id)),
      catchError(e => {
        this._ms.add({ severity: 'error', detail: e.result });
        return EMPTY;
      }))
      .subscribe(res => {
        this.users$ = this._queryUserList(this.currentPage);
        this._ms.add({ severity: 'success', detail: `User "${item.username}" was deleted successfully!` });
        this._cd.detectChanges();
      })
  }

  private _queryUserList(page: number): Observable<User[]> {
    return this._us.getUsers({ page, sort: 'email' }).pipe(
      pluck('result'),
      map(users => users.map((user, i) => ({
        ...user,
        index: i + 1,
        fullName: `${user.firstName} ${user.lastName}`.trim(),
        role: this._translateService.instant(`userRoles.${user.role}`)
      }))));
  }
}
