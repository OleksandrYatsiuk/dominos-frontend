import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/module-auth/auth.model';
import { ConfirmService } from '@core/services/confirm.service';
import { catchError, EMPTY, filter, map, mergeMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from '@shared/components/table/table.component';
import { GlobalTableSearchComponent } from '@shared/components/table/global-search/global-search.component';
import { ActionsComponent, ActionsFn } from '@shared/components/actions/actions.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ITableColumn } from '@shared/components/table/interfaces';

interface UsersRecord {
  original: User;
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TableComponent, GlobalTableSearchComponent, ActionsComponent],
})
export class UsersListComponent {
  page = signal(1);

  rows = signal(10);

  columns = signal<ITableColumn[]>([
    { field: 'username', header: 'labels.username', sortable: true },
    { field: 'fullName', header: 'labels.fullName', sortable: true },
    { field: 'role', header: 'labels.role', sortable: true },
    { field: 'email', header: 'labels.email', sortable: true },
    { field: 'actions', header: '', width: '100px' }
  ]);

  constructor(
    private _us: UserManagementDataService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService,
    private _translateService: TranslateService
  ) { }

  actions: ActionsFn<UsersRecord> = (record) => [
    {
      id: 'delete',
      icon: 'icon icon-trash',
      label: 'Delete',
      command: () => {
        this.onDelete(record);
      }
    }
  ];

  onDelete(user: UsersRecord): void {
    this._cs.delete().pipe(
      filter(result => result),
      mergeMap(() => this._us.deleteItem(user.id)),
      catchError(e => {
        this._ms.add({ severity: 'error', detail: e.result });
        return EMPTY;
      }))
      .subscribe(() => {
        this.users.reload();
        this._ms.add({ severity: 'success', detail: `User "${user.username}" was deleted successfully!` });
        this._cd.detectChanges();
      })
  }

  private transformUsers(user: User): UsersRecord {
    return {
      original: user,
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      role: this._translateService.instant(`userRoles.${user.role}`),
    }
  }

  users = rxResource({
    request: () => ({ page: this.page(), rows: this.rows() }),
    loader: ({ request }) => this._us.getUsers({ page: request.page, limit: request.rows, sort: 'email' }).pipe(
      map((response) => response.result),
      map((records) => records.map((r) => this.transformUsers(r)))
    )
  });
}
