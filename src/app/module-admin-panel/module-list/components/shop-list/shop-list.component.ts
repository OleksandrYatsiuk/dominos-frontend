import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable } from 'rxjs';
import { IShop } from '@core/models/shop.interface';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopListComponent implements OnInit {
  totalRecords: number;
  currentPage = 1;
  rows = 10;
  shops$: Observable<IShop[]>;
  cols: { field: string; header: string; }[];
  defaultImage = '/assets/img/stub-image.png';

  constructor(
    private _ss: ShopService,
    private _cs: ConfirmService,
    private _ms: MessageService

  ) { }

  ngOnInit() {
    this.shops$ = this._queryShopList(this.currentPage);

    this.cols = [
      // { field: 'index', header: '#' },
      { field: 'image', header: 'image' },
      { field: 'address', header: 'Address' },
      { field: 'createdAt', header: 'createdAt' },
      { field: 'updatedAt', header: 'updatedAt' }
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
          this._ms.add({ severity: 'success', detail: `Shop "${item.address}" was deleted successfully!` });
        }, (e) => {
          this._ms.add({ severity: 'error', detail: e.result });
        })
      };
    });
  }


  private _queryShopList(page: number): Observable<IShop[]> {
    return this._ss.queryShopsList({ page, limit: this.rows }).pipe(
      // tap(({ result, _meta }) => {
      //   this.currentPage = _meta.pagination.page;
      //   this.totalRecords = _meta.pagination.total;
      // }),
      // pluck('result')
    );
  }
}