import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DeliveryDataService } from '../delivery-data.service';
import { pluck } from 'rxjs/operators';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'amount', 'date'];
  dataSource;
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;

  constructor(
    private http: DeliveryDataService
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
}
