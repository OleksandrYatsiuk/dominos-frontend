import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { PromotionDataService } from '@core/services/promotion-data.service';
import { MessageService } from 'primeng/api';
import { Promotion } from '@core/models/promotions/promotions.model';
import { ConfirmService } from '@core/services/confirm.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { TableItem } from '@core/models/table.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { DatePipe } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { rxResource } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from '@shared/components/table/table.component';
import { GlobalTableSearchComponent } from '@shared/components/table/global-search/global-search.component';
import { ActionsComponent, ActionsFn } from '@shared/components/actions/actions.component';
import { ITableColumn } from '@shared/components/table/interfaces';

interface PromotionRecord {
  original: Promotion;
  id: string;
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
  imports: [LangPipe, ActionsComponent, TableComponent, GlobalTableSearchComponent, LazyLoadImageModule, InputTextModule, RouterModule, TranslateModule]
})
export class PromotionListComponent {
  promotions$: Observable<Promotion[]>;
  cols: TableItem[];

  page = signal(1);

  rows = signal(10);

  columns = signal<ITableColumn[]>([
    { field: 'name', header: 'Name', sortable: true },
    { field: 'description', header: 'Description', sortable: true },
    { field: 'started', header: 'Start Date', sortable: true },
    { field: 'ended', header: 'End Date', sortable: true },
    { field: 'actions', header: '', width: '100px' }
  ])

  constructor(
    private _ps: PromotionDataService,
    private _cs: ConfirmService,
    private _ms: MessageService,
    private _cd: ChangeDetectorRef,
    private _datePipe: DatePipe,
    private _langPipe: LangPipe
  ) { }

  actions: ActionsFn<PromotionRecord> = (record) => [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'icon icon-edit',
      command: () => {
        inject(Router).navigate([record.id, 'edit']);
      }
    },
    {
      id: 'delete',
      icon: 'icon icon-trash',
      label: 'Delete',
      command: () => {
        this.onDelete(record);
      }
    }
  ];

  onPageChange(page: number): void {
    this.page.update(() => page + 1);
  }

  onDelete(item: PromotionRecord): void {
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
      id: promo.id,
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
