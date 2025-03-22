import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Drink } from '@core/models/drinks/drinks.model';
import { TableItem } from '@core/models/table.interface';
import { ConfirmService } from '@core/services/confirm.service';
import { DrinksService } from '@core/services/drinks/drinks.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, filter, mergeMap, map } from 'rxjs';
import { DrinksFormDialogComponent } from 'src/app/module-admin-panel/module-drinks/components/drinks-form-dialog/drinks-form-dialog.component';
import { FetchAllDrinks } from 'src/app/module-drinks/drinks.actions';
import { DrinksState } from 'src/app/module-drinks/drinks.state';

@UntilDestroy()
@Component({
    selector: 'app-drinks-list',
    templateUrl: './drinks-list.component.html',
    styleUrls: ['./drinks-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LangPipe],
    standalone: false
})
export class DrinksListComponent implements OnInit, OnDestroy {
  @Select(DrinksState.drinks) drinks$: Observable<Drink[]>;

  list$: Observable<any>;
  totalPages: number;
  currentPage = 1;
  rows = 10;
  cols: TableItem[];
  ref: DynamicDialogRef;
  constructor(
    private _drinksService: DrinksService,
    private _confirmationService: ConfirmService,
    private _messageService: MessageService,
    private _translateService: TranslateService,
    private _dialogService: DialogService,
    private _langPipe: LangPipe,
    private _store: Store,
    private _cd: ChangeDetectorRef) { }


  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {
    this.list$ = this.drinks$.pipe(map(drinks => drinks.map((drink, i) => ({
      ...drink,
      index: i + 1,
      shortName: this._langPipe.transform(drink.name),
      minSize: drink.size.small,
      minPrice: drink.price.small,
      category: this._translateService.instant('categoriesLabels.drinks.' + drink.category)
    }))))

    this._queryDrinksList();

    this.cols = [
      { field: 'index', header: '#', style: { width: '100px' } },
      { field: 'shortName', header: 'Name', sortable: true },
      { field: 'image', header: 'Image', sortable: true },
      { field: 'minPrice', header: 'Price', sortable: true },
      { field: 'minSize', header: 'Size', sortable: true },
      { field: 'category', header: 'Categories', sortable: true },
      { field: 'options', header: 'labels.options', style: { width: '100px' } }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this._queryDrinksList();
  }

  onDelete(drink: Drink): void {
    this._confirmationService.delete().pipe(
      filter(result => result),
      untilDestroyed(this),
      mergeMap(() => this._drinksService.queryDrinkRemove(drink.id)))
      .subscribe(res => {
        this._messageService.add({ severity: 'success', detail: 'Drink was deleted successfully' });
        this._queryDrinksList();
        this._cd.detectChanges();
      })
  }

  onCreateDrink(): void {
    this.ref = this._dialogService.open(DrinksFormDialogComponent, {
      styleClass: 'd-dialog',
    });

    this.ref.onClose.pipe(filter(result => result), untilDestroyed(this)).subscribe(() => {
      this._queryDrinksList();
      this._messageService.add({ severity: 'success', detail: 'Drink was created successfully' });
      this._cd.detectChanges();

    });
  }

  onEditDrink(drink: Drink): void {
    this.ref = this._dialogService.open(DrinksFormDialogComponent, {
      styleClass: 'd-dialog',
      data: { drink }
    });
    this.ref.onClose.pipe(filter(result => result), untilDestroyed(this)).subscribe(() => {
      this._queryDrinksList();
      this._messageService.add({ severity: 'success', detail: 'Drink was update successfully' });
      this._cd.detectChanges();
    });
  }

  private _queryDrinksList(): void {
    this._store.dispatch(new FetchAllDrinks({ page: this.currentPage, sort: '-updatedAt' }))

  }

}
