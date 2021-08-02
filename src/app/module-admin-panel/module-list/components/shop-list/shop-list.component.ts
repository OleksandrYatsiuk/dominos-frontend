import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable, pluck, tap } from 'rxjs';
import { IShop } from '@core/models/shop.interface';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  totalRecords: number;
  currentPage = 1;
  rows = 10;
  shops$: Observable<IShop[]>;
  cols: { field: string; header: string; }[];
  constructor(
    private _ss: ShopService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    public notification: NotificationService
  ) { }

  ngOnInit() {
    this.shops$ = this._queryShopList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'address', header: 'Address' }
    ];
  }


  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.shops$ = this._queryShopList(this.currentPage);
  }

  onDelete(item: IShop): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this._ss.remove(item.id).subscribe(res => {
          this.shops$ = this._queryShopList(this.currentPage);
          this.notification.showSuccess(`Shop "${item.address}" was deleted successfully!`);
        }, (e) => {
          this.notification.showDanger(e.result);
        })
      };
    });
  }


  private _queryShopList(page: number): Observable<IShop[]> {
    return this._ss.queryShopsList({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        this.currentPage = _meta.pagination.page;
        this.totalRecords = _meta.pagination.total;
      }),
      pluck('result'));
  }
}
