import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';
import { IDictionary } from '@core/models/dictionary';
import { Observable, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientListComponent implements OnInit {
  ingredients$: Observable<IDictionary[]>;
  displayedColumns: string[] = ['id', 'name', 'delete'];
  currentPage = 1
  totalRecords: number;
  rows = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: any;
  public collectionSize: number;

  constructor(
    private http: RootService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
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
    return this.http.getIngredientsList({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        const { page, total } = _meta.pagination;
        this.currentPage = page;
        this.totalRecords = total;
      }),
      pluck('result'));
  }

}
