import { Component, OnInit } from '@angular/core';
import { DeliveryDataService } from '../delivery-data.service';
import { PageEvent, MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'amount', 'date', 'delete'];
  dataSource;
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;

  constructor(
    private http: DeliveryDataService,
    public dialog: MatDialog,
    public notification: NotificationService
  ) { }

  ngOnInit() {
    this.getList(1, this.pageSize)

  }
  showChanges(event: PageEvent) {
    this.getList(++event.pageIndex, event.pageSize)
  }
  getList(page, perPage) {
    this.http.deliveryList(page, perPage)
      .subscribe(response => {
        let { totalCount } = response['_meta'].pagination;
        this.length = totalCount;
        this.dataSource = response['result'];
      })
  }

  delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '300px',
      data: { name: "Ви дійсно хочете видалити замовлення", delivery: item }
    });
    dialogRef.afterClosed().subscribe();
  }
}
