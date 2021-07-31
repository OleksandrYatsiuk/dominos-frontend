import { Component, OnInit } from '@angular/core';
import { DeliveryDataService } from '../../module-delivery/delivery-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'amount', 'date', 'delete'];
  deliveries;
  page = 1
  pages = 1
  length = 100;
  pageSize = 20;
  collectionSize: number;

  constructor(
    private http: DeliveryDataService,
    public notification: NotificationService,
    private _cs: ConfirmService
  ) { }

  ngOnInit() {
    this.getList(this.page, this.pageSize)
  }

  getList(page: number, limit: number, sort = '-createdAt') {
    this.http.deliveryList({ params: { page, limit, sort } })
      .subscribe(({ result, _meta }) => {
        const { total } = _meta.pagination;
        this.length = total;
        this.deliveries = result;
        this.page = _meta.pagination.page
        this.pages = _meta.pagination.pages
        this.collectionSize = _meta.pagination.total / 20
      });
  }

  public showPage(page: number) {
    this.http.deliveryList({ params: { page, limit: 20, sort: '-createdAt' } })
      .subscribe(({
        result, _meta }) => {
        this.deliveries = result;
        this.page = _meta.pagination.page;
        this.pages = _meta.pagination.pages;
      });
  }

  delete(item): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this.http.delete(item.id)
          .subscribe(res => {
            this.notification.showSuccess("Delivery was deleted successfully")
            this.getList(1, this.pageSize);
          })
      }
    })
  }
}
