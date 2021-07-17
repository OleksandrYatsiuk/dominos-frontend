import { Component, OnInit } from '@angular/core';
import { UserManagementDataService } from 'src/app/core/services/user-management-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { User } from 'src/app/auth/auth.model';

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
    public modal: ModalService,
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

  public delete(item:User): void {
    this.modal.openDeleteModal(`user "${item.username}"`).result
      .then(res => {
        this.http.deleteItem(item.id).subscribe(res => {
          this.getList(this.page, this.pages);
          this.notification.showSuccess(`User "${item.username}" was deleted successfully!`);
        }, (e) => {
          this.notification.showDanger(e.result);
        })

      })
      .catch(e => e)
  }
}
