import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Promotion } from 'src/app/module-admin-panel/module-promotions/components/promotion-create/promotions.interface';
import { ConfirmService } from '@core/services/confirm.service';
import { Observable, pluck } from 'rxjs';
import { tap } from 'rxjs';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionListComponent implements OnInit {
  totalPages: number;
  currentPage = 1;
  rows = 20;
  promotions$: Observable<Promotion[]>;
  collectionSize: number;

  constructor(
    private _ps: PromotionDataService,
    private _cs: ConfirmService,
    private notification: NotificationService,
    private _cd: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.promotions$ = this._queryPromotionList(this.currentPage);
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
            this.notification.showSuccess(`Акція "${item.title}" видалена успішно!`);
            this._cd.detectChanges();
          }, (e) => {
            this.notification.showDanger(e.result);
            this._cd.detectChanges();
          })
      }
    });
  }

  private _queryPromotionList(page: number): Observable<Promotion[]> {
    return this._ps.getData({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        this.currentPage = _meta.pagination.page;
        this.totalPages = _meta.pagination.total;
      }),
      pluck('result'));
  }
}
