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
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20];
  pageEvent: PageEvent;

  constructor(
    private http: DeliveryDataService
  ) { }

  ngOnInit() {
    this.http.deliveryList()
      .pipe(pluck('result'))
      .subscribe(list => {
        this.dataSource = list;
        this.length = list['length'];
      })
  }
  showChanges(event: PageEvent) {
    console.log(event);
  }
}
