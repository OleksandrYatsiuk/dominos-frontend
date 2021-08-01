import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeliveryDataService } from '../../../../module-delivery/delivery-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable, pluck, tap } from 'rxjs';
import { Delivery } from 'src/app/module-delivery/delivery.model';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'amount', 'date', 'delete'];
  deliveries$: Observable<Delivery[]>
  currentPage = 1
  totalPages = 100;
  rows = 20;
  collectionSize: number;

  constructor(
    private _ds: DeliveryDataService,
    public notification: NotificationService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.deliveries$ = this._queryPromotionList(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.deliveries$ = this._queryPromotionList(this.currentPage);
  }

  delete(item: Delivery): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this._ds.delete(item.id)
          .subscribe(res => {
            this.notification.showSuccess("Delivery was deleted successfully");
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
