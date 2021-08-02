import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PizzaDataService } from '@core/services/pizza-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';
import { Pizza } from '@core/models/pizza.interface';
import { Observable, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaListComponent implements OnInit {
  rows = 10;
  totalPages = 1;
  currentPage = 1;
  pizzas$: Observable<Pizza[]>;
  cols: { field: string; header: string; }[];
  constructor(
    private _ps: PizzaDataService,
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.pizzas$ = this._queryPizzaList(this.currentPage);

    this.cols = [
      { field: 'index', header: '#' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.pizzas$ = this._queryPizzaList(page + 1);
  }

  onDelete(item: Pizza): void {
    this._cs.delete().subscribe(result => {
      if (result) {
        this._ps.remove(item.id)
          .subscribe(() => {
            this.pizzas$ = this._queryPizzaList(1);
            this.notification.showSuccess(`Піца "${item.name}" видалена успішно!`);
            this._cd.detectChanges();
          })
      }
    });
  }


  private _queryPizzaList(page: number): Observable<Pizza[]> {
    return this._ps.getPizzas({ page, limit: this.rows }).pipe(
      tap(({ result, _meta }) => {
        this.currentPage = _meta.pagination.page;
        this.totalPages = _meta.pagination.total;
      }),
      pluck('result'));
  }
}
