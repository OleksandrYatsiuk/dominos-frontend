import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { map, Observable, pluck } from 'rxjs';
import { IShop } from '@core/models/shop.interface';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { DatePipe } from '@angular/common';
import { TableItem } from '@core/models/table.interface';
import { stubImage } from 'src/utils/stubs';

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LangPipe, DatePipe],
    standalone: false
})
export class ShopListComponent implements OnInit {
  totalRecords: number;
  currentPage = 1;
  rows = 10;
  shops$: Observable<IShop[]>;
  cols: TableItem[];
  defaultImage = stubImage;

  constructor(
    private _ss: ShopService,
    private _cs: ConfirmService,
    private _ms: MessageService,
    private _datePipe: DatePipe,
    private _langPipe: LangPipe

  ) { }

  ngOnInit() {
    this.shops$ = this._queryShopList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#', sortable: true },
      { field: 'image', header: 'Image', },
      { field: 'addressShop', header: 'Address', sortable: true },
      { field: 'createdAt', header: 'Created', sortable: true },
      { field: 'updatedAt', header: 'Last Updated', sortable: true }
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
      pluck('result'),
      map((shops: IShop[]) => shops.map((shop, i) => ({
        ...shop,
        index: i + 1,
        addressShop: this._langPipe.transform(shop.address),
        updatedAt: this._datePipe.transform(shop.updatedAt),
        createdAt: this._datePipe.transform(shop.createdAt)
      })))
      // tap(({ result, _meta }) => {
      //   this.currentPage = _meta.pagination.page;
      //   this.totalRecords = _meta.pagination.total;
      // }),
      // pluck('result')
    );
  }
}
