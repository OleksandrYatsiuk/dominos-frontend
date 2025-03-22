import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeliveryDataService } from '../../../../module-delivery/delivery-data.service';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable, pluck, tap } from 'rxjs';
import { Delivery } from 'src/app/module-delivery/delivery.model';
import { MessageService } from 'primeng/api';
import { TableItem } from '@core/models/table.interface';

@Component({
    selector: 'app-delivery-list',
    templateUrl: './delivery-list.component.html',
    styleUrls: ['./delivery-list.component.scss'],
    standalone: false
})
export class DeliveryListComponent implements OnInit {

  deliveries$: Observable<Delivery[]>
  currentPage = 1
  totalPages = 100;
  rows = 10;
  cols: TableItem[];

  constructor(
    private _ds: DeliveryDataService,
    private _ms: MessageService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'phone', header: 'Phone' },
      { field: 'amount', header: 'Amount' },
      { field: 'date', header: 'Date' },
    ];
    this.deliveries$ = this._queryPromotionList(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.deliveries$ = this._queryPromotionList(this.currentPage);
  }

  onDelete(item: Delivery): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this._ds.delete(item.id)
          .subscribe(res => {
            this._ms.add({ severity: 'success', detail: "Delivery was deleted successfully" });
            this.deliveries$ = this._queryPromotionList(this.currentPage);
            this._cd.detectChanges();
          })
      }
    })
  }

  private _queryPromotionList(page: number): Observable<Delivery[]> {
    return this._ds.deliveryList({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        this.currentPage = _meta.pagination.page;
        this.totalPages = _meta.pagination.total;
      }),
      pluck('result'));
  }
}
