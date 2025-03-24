import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { MessageService } from 'primeng/api';
import { Promotion } from '@core/models/promotions/promotions.model';
import { ConfirmService } from '@core/services/confirm.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { TableItem } from '@core/models/table.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { DatePipe, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { rxResource } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface PromotionRecord {
  original: Promotion;
  started: string;
  ended: string;
  name: string;
  description: string;
}

@UntilDestroy()
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, LangPipe],
  standalone: true,
  imports: [NgStyle, LangPipe, TableModule, LazyLoadImageModule, InputTextModule, RouterModule, TranslateModule]
})
export class PromotionListComponent implements OnInit {
  promotions$: Observable<Promotion[]>;
  cols: TableItem[];

  page = signal(1);

  rows = signal(10);

  constructor(
    private _ps: PromotionDataService,
    private _cs: ConfirmService,
    private _ms: MessageService,
    private _cd: ChangeDetectorRef,
    private _datePipe: DatePipe,
    private _langPipe: LangPipe
  ) { }


  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name', sortable: true },
      { field: 'description', header: 'Description', sortable: true },
      { field: 'started', header: 'Start Date', sortable: true },
      { field: 'ended', header: 'End Date', sortable: true },
      { field: 'options', header: 'labels.options', style: { width: '100px' } }
    ];
  }

  onPageChange(page: number): void {
    this.page.update(() => page + 1);
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
      .subscribe(() => {
        this.promotions.reload();
        this._ms.add({ severity: 'success', detail: `Акція "${item.name}" видалена успішно!` });
        this._cd.detectChanges();
      });
  }

  private transformPromotions(promo: Promotion): PromotionRecord {
    return {
      original: promo,
      started: this._datePipe.transform(promo.startedAt),
      ended: promo.endedAt ? this._datePipe.transform(promo.endedAt) : '-',
      name: this._langPipe.transform(promo.name),
      description: this._langPipe.transform(promo.description),
    }
  }

  promotions = rxResource({
    request: () => ({ page: this.page(), rows: this.rows() }),
    loader: ({ request }) => this._ps.getData({ page: request.page, limit: request.rows }).pipe(
      map((response) => response.result),
      map((records) => records.map((r) => this.transformPromotions(r)))
    )
  });
}
