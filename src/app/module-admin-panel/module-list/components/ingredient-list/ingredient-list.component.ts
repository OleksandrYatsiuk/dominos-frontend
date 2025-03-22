import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { IDictionary, IMultiLanguageDictionary } from '@core/models/dictionary';
import { Observable, pluck, tap } from 'rxjs';
import { IngredientsService } from '@core/services/ingredients.service';
import { TableItem } from '@core/models/table.interface';

@Component({
    selector: 'app-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class IngredientListComponent implements OnInit {
  ingredients$: Observable<IMultiLanguageDictionary[]>;
  currentPage = 1
  totalRecords: number;
  rows = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  cols: TableItem[];

  constructor(
    private _is: IngredientsService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'createdAt', header: 'createdAt' },
      { field: 'updatedAt', header: 'updatedAt' }
    ];
    this.ingredients$ = this._queryIngredientsList(this.currentPage);
  }

  onDelete(item: IDictionary): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this.ingredients$ = this._queryIngredientsList(this.currentPage);
        // this._ms.add({ severity: 'success', detail: `Ingredient "${item.name}" was deleted successfully`)
        this._ms.add({ severity: 'error', detail: 'Delete ingredient was not realise!' })
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.ingredients$ = this._queryIngredientsList(this.currentPage);
  }

  private _queryIngredientsList(page: number): Observable<IMultiLanguageDictionary[]> {
    return this._is.getIngredientsList({ page, limit: this.rows }).pipe(
      // tap(({ result, _meta }) => {
      //   const { page, total } = _meta.pagination;
      //   this.currentPage = page;
      //   this.totalRecords = total;
      // }),
      // pluck('result')
    );
  }

}
