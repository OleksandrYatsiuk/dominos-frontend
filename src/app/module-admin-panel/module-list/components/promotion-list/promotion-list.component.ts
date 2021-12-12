import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { MessageService } from 'primeng/api';
import { Promotion } from '@core/models/promotions/promotions.model';
import { ConfirmService } from '@core/services/confirm.service';
import { EMPTY, Observable, pluck } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { TableItem } from '@core/models/table.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { DatePipe } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe, DatePipe]
})
export class PromotionListComponent implements OnInit {
  currentPage = 1;
  rows = 10;
  promotions$: Observable<Promotion[]>;
  cols: TableItem[];

  constructor(
    private _ps: PromotionDataService,
    private _cs: ConfirmService,
    private _ms: MessageService,
    private _cd: ChangeDetectorRef,
    private _datePipe: DatePipe,
    private _langPipe: LangPipe
  ) { }


  ngOnInit(): void {
    this.promotions$ = this._queryPromotionList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#', sortable: true, style: { width: '100px' } },
      { field: 'image', header: 'Image' },
      { field: 'shortName', header: 'Name', sortable: true },
      { field: 'shortDescription', header: 'Description', sortable: true },
      { field: 'started', header: 'Start Date', sortable: true },
      { field: 'ended', header: 'End Date', sortable: true },
      { field: 'options', header: 'labels.options', style: { width: '100px' } }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.promotions$ = this._queryPromotionList(page + 1);
  }


  onDelete(item: Promotion): void {
    this._cs.delete().pipe(
      filter(result => result),
      mergeMap(() => this._ps.remove(item.id)),
      catchError(e => {
        this._ms.add({ severity: 'error', detail: e.result });
        return EMPTY;
      }),
      untilDestroyed(this)
    )
      .subscribe(res => {
        this.promotions$ = this._queryPromotionList(this.currentPage);
        this._ms.add({ severity: 'success', detail: `Акція "${item.name}" видалена успішно!` });
        this._cd.detectChanges();
      });
  }

  private _queryPromotionList(page: number): Observable<Promotion[]> {
    return this._ps.getData({ page, limit: this.rows }).pipe(
      pluck('result'), map(promotions => promotions.map((promotion, i) => ({
        ...promotion,
        index: i + 1,
        started: this._datePipe.transform(promotion.startedAt),
        ended: promotion.endedAt ? this._datePipe.transform(promotion.endedAt) : '-',
        shortName: this._langPipe.transform(promotion.name),
        shortDescription: this._langPipe.transform(promotion.description)
      }))));
  }
}
