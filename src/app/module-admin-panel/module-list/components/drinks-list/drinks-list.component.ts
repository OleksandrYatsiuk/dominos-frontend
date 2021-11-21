import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Drink } from '@core/models/drinks/drinks.model';
import { TableItem } from '@core/models/table.interface';
import { ConfirmService } from '@core/services/confirm.service';
import { DrinksService } from '@core/services/drinks/drinks.service';
import { Select, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, pluck, tap, filter } from 'rxjs';
import { DrinksFormDialogComponent } from 'src/app/module-admin-panel/module-drinks/components/drinks-form-dialog/drinks-form-dialog.component';
import { FetchAllDrinks } from 'src/app/module-drinks/drinks.actions';
import { DrinksState } from 'src/app/module-drinks/drinks.state';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit, OnDestroy {
  @Select(DrinksState.drinks) drinks$: Observable<Drink[]>;
  totalPages: number;
  currentPage = 1;
  rows = 10;
  cols: TableItem[];
  ref: DynamicDialogRef
  constructor(
    private _drinksService: DrinksService,
    private _confirmationService: ConfirmService,
    private _messageService: MessageService,
    private _dialogService: DialogService,
    private _store: Store,
    private _cd: ChangeDetectorRef) { }


  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {

    this.cols = [
      { field: 'index', header: '#' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'size', header: 'Size' },
      { field: 'category', header: 'Categories' },
    ];
    this._store.dispatch(new FetchAllDrinks({ page: this.currentPage }));
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this._store.dispatch(new FetchAllDrinks({ page: this.currentPage }));
  }

  onDelete(drink: Drink): void {
    this._confirmationService.delete().subscribe(res => {
      if (res) {
        this._drinksService.queryDrinkRemove(drink.id)
          .subscribe(res => {
            this._messageService.add({ severity: 'success', detail: 'Drink was deleted successfully' });
            this._store.dispatch(new FetchAllDrinks({ page: this.currentPage }));
            this._cd.detectChanges();
          })
      }
    })
  }

  onCreateDrink(): void {
    this.ref = this._dialogService.open(DrinksFormDialogComponent, {
      styleClass: 'd-dialog',
    });

    this.ref.onClose.pipe(filter(result => result)).subscribe(() => {
      this._store.dispatch(new FetchAllDrinks({ page: this.currentPage }));
      this._messageService.add({ severity: 'success', detail: 'Drink was created successfully' });
      this._cd.detectChanges();

    });
  }

  onEditDrink(drink: Drink): void {
    this.ref = this._dialogService.open(DrinksFormDialogComponent, {
      styleClass: 'd-dialog',
      data: { drink }
    });
    this.ref.onClose.pipe(filter(result => result)).subscribe(() => {
      this._store.dispatch(new FetchAllDrinks({ page: this.currentPage }));
      this._messageService.add({ severity: 'success', detail: 'Drink was update successfully' });
      this._cd.detectChanges();
    });
  }

}
