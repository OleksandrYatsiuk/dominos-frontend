import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  public page = 1;
  public pageSize = 20;
  shops: any;
  collectionSize: number;
  constructor(
    private http: ShopService,
    public dialog: MatDialog,
    public notification: NotificationService) { }

  ngOnInit() {
    this.getList(this.page, this.pageSize)
  }

  public getList(page: number, limit: number, sort = 'name') {
    this.http.getData({ params: { page, limit, sort } })
      .subscribe(({ result, _meta }) => {
        this.shops = result;
        this.page = _meta.pagination.page;
        this.collectionSize = _meta.pagination.total / this.pageSize
      });
  }
  public showPage(event: number) {
    this.getList(event, this.pageSize)
  }

  public delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: `Ви дійсно хочете видалити магазин "${item.address}" ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.remove(item.id).subscribe(res => {
          this.getList(this.page, this.pageSize);
          this.notification.open({
            data: `Магазин "${item.address}" видалений успішно!`
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
