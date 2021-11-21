import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { MessageService } from 'primeng/api';
import { Promotion } from '@core/models/promotions/promotions.model';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable, pluck } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TableItem } from '@core/models/table.interface';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionListComponent implements OnInit {
  totalPages: number;
  currentPage = 1;
  rows = 10;
  promotions$: Observable<Promotion[]>;
  cols: TableItem[];

  constructor(
    private _ps: PromotionDataService,
    private _cs: ConfirmService,
    private _ms: MessageService,
    private _cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.promotions$ = this._queryPromotionList(this.currentPage);

    this.cols = [
      // { field: 'index', header: '#' },
      { field: 'image', header: 'Image' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'startedAt', header: 'Start Date' },
    ];
  }


  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.promotions$ = this._queryPromotionList(page + 1);
  }


  onDelete(item: Promotion): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this._ps.remove(item.id)
          .subscribe(res => {
            this.promotions$ = this._queryPromotionList(this.currentPage);
            this._ms.add({ severity: 'success', detail: `Акція "${item.name}" видалена успішно!` });
            this._cd.detectChanges();
          }, (e) => {
            this._ms.add({ severity: 'error', detail: e.result });
            this._cd.detectChanges();
          })
      }
    });
  }

  private _queryPromotionList(page: number): Observable<Promotion[]> {
    return this._ps.getData({ page, limit: this.rows }).pipe(
      tap(({ page, total }) => {
        this.currentPage = page;
        this.totalPages = total;
      }),
      pluck('result'));
  }
}
