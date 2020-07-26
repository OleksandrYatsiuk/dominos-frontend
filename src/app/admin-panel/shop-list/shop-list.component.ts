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
  public pages = 1;
  shops: any;
  constructor(
    private http: ShopService,
    public dialog: MatDialog,
    public notification: NotificationService) { }

  ngOnInit() {
    this.http.getData({ params: { page: this.page, limit: 20 } }).subscribe(({ result, _meta }) => {
      this.shops = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }


  public setPage(page: number): void {
    if (page < 1) { page = 1 }
    this.http.getData({ params: { page: page, limit: 20 } }).subscribe(({
      result, _meta }) => {
      this.shops = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }

  public delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: `Ви дійсно хочете видалити магазин "${item.address}" ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.remove(item.id).subscribe(res => {
          this.setPage(this.page);
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
