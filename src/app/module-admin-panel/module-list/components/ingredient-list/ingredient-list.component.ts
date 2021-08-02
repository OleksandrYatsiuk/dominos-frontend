import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';
import { IDictionary } from '@core/models/dictionary';
import { Observable, pluck, tap } from 'rxjs';
import { IngredientsService } from '@core/services/ingredients.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientListComponent implements OnInit {
  ingredients$: Observable<IDictionary[]>;
  currentPage = 1
  totalRecords: number;
  rows = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  cols: { field: string; header: string; }[];

  constructor(
    private _is: IngredientsService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' }
    ];
    this.ingredients$ = this._queryIngredientsList(this.currentPage);
  }

  onDelete(item: IDictionary): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this.ingredients$ = this._queryIngredientsList(this.currentPage);
        // this.notification.showSuccess(`Ingredient "${item.name}" was deleted successfully`)
        this.notification.showDanger('Delete ingredient was not realise!')
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.ingredients$ = this._queryIngredientsList(this.currentPage);
  }

  private _queryIngredientsList(page: number): Observable<IDictionary[]> {
    return this._is.getIngredientsList({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        const { page, total } = _meta.pagination;
        this.currentPage = page;
        this.totalRecords = total;
      }),
      pluck('result'));
  }

}
