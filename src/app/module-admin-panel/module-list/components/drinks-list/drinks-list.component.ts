import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Drink } from '@core/models/drinks/drinks.model';
import { TableItem } from '@core/models/table.interface';
import { ConfirmService } from '@core/services/confirm.service';
import { DrinksService } from '@core/services/drinks/drinks.service';
import { MessageService } from 'primeng/api';
import { Observable, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {
  drinks$: Observable<Drink[]>;
  totalPages: number;
  currentPage = 1;
  rows = 10;
  cols: TableItem[];
  constructor(
    private _drinksService: DrinksService,
    private _confirmationService: ConfirmService,
    private _messageService: MessageService,
    private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'index', header: '#' },
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'size', header: 'Size' },
      { field: 'category', header: 'Categories' },
    ];
    this.drinks$ = this._queryDrinksList(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this.drinks$ = this._queryDrinksList(this.currentPage);
  }

  onDelete(drink: Drink): void {
    this._confirmationService.delete().subscribe(res => {
      if (res) {
        this._drinksService.queryDrinkRemove(drink.id)
          .subscribe(res => {
            this._messageService.add({ severity: 'success', detail: "Drink was deleted successfully" });
            this.drinks$ = this._queryDrinksList(this.currentPage);
            this._cd.detectChanges();
          })
      }
    })
  }

  private _queryDrinksList(page: number = 1): Observable<Drink[]> {
    return this._drinksService.queryDrinkList({ page, limit: this.rows, sort: 'createdAt' }).pipe(
      tap((response) => {
        this.currentPage = response.page;
        this.totalPages = response.total;
      }), pluck('result')
    );
  }

}
