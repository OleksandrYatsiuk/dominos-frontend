import { Component, OnInit } from '@angular/core';
import { DeliveryDataService } from '../../delivery/delivery-data.service';
import { PageEvent, MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { map } from 'rxjs/operators';

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
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  collectionSize: number;

  constructor(
    private http: DeliveryDataService,
    public dialog: MatDialog,
    public notification: NotificationService
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
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: 'Ви дійсно хочете видалити замовлення?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getList(1, this.pageSize);
      }
    });
  }
}
