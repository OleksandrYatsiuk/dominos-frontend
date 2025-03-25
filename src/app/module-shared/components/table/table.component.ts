import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChangeDetectionStrategy, Component, computed, input, output, TemplateRef, viewChild
} from '@angular/core';
import { ITableColumn } from './interfaces';

export interface NoRecordsConfig {
  message: string;
  caption: string;
  icon: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgTemplateOutlet, TableModule, TranslateModule]
})
export class TableComponent<T = any> {
  table = viewChild(Table);

  value = input.required<T[]>();

  columns = input.required<ITableColumn[]>();

  cellTemplate = input<TemplateRef<any>>();

  rowExpandTemplate = input<TemplateRef<any>>();

  scrollHeight = input<string>();

  rowExpandMode = input<'multiple' | 'single'>('single');

  dataKey = input<string>('id');

  globalFilterFields = input<string[] | undefined>(undefined);

  rowTrackBy = input<(index: number, item: T) => any>();

  cols = computed(() => this.columns().filter((col) => this.filterByCondition(col)))

  emptyConfig = input<Partial<NoRecordsConfig>>({ icon: '', message: '', caption: '' });

  onRowExpand = output<T>();

  onRowCollapse = output<T>();

  loaderRowCount = Array.from({ length: 5 }).map(() => 1);

  rowStyleClass: (data: T, expanded?: string) => string = input<string>('');

  filterGlobal(value: string, matchMode: string): void {
    if (this.table()) {
      this.table().filterGlobal(value, matchMode);
    }
  }

  private filterByCondition(column: ITableColumn): boolean {
    if (!column.conditions) {
      return true;
    }
    return column.conditions.every((condition) => condition);
  }
}
