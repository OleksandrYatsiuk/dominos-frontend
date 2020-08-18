import { Component, OnInit } from '@angular/core';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any;
  public page = 1;
  public pages = 20;
  collectionSize: number;
  constructor(
    private http: UserManagementDataService,
    public dialog: MatDialog,
    public notification: NotificationService
  ) { }

  ngOnInit() {
    this.getList(this.page, this.pages)
  }
  private getList(page: number, limit: number, sort = 'createdAt') {
    this.http.getUsers({
      params: {
        page, limit, sort
      }
    })
      .subscribe(({ result, _meta }) => {
        this.users = result;
        this.page = _meta.pagination.page;
        this.pages = _meta.pagination.pages;
        this.collectionSize = _meta.pagination.total / this.pages;
      }
      );
  }

  public showPage(event: number) {
    this.getList(event, this.pages)
  }

  public delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: `Ви дійсно хочете видалити користувача "${item.username}" ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.deleteItem(item.id).subscribe(res => {
          this.getList(this.page, this.pages);
          this.notification.open({
            data: `Користувач "${item.username}" видалений успішно!`
          });
        }, (e) => {
          this.notification.open({
            data: {
              status: false,
              message: e.result
            }
          });
        })
      }
    });
  }
}
