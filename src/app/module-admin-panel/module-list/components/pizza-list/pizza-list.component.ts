import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { Pizza } from '@core/models/pizza.interface';
import { TableItem } from '@core/models/table.interface';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { DeletePizza, FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DatePipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PizzasFormDialogComponent } from 'src/app/module-admin-panel/module-pizzas/components/pizzas-form-dialog/pizzas-form-dialog.component';
import { stubImage } from 'src/utils/stubs';

type PizzaTable = Pizza & {

}

@UntilDestroy()
@Component({
    selector: 'app-pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LangPipe, DatePipe],
    standalone: false
})
export class PizzaListComponent implements OnInit, OnDestroy {
  currentPage = 1;
  cols: TableItem[];
  tablePizza$: Observable<PizzaTable[]>;
  stubImage = stubImage;
  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>
  ref: DynamicDialogRef;

  constructor(
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService,
    private _langPipe: LangPipe,
    private _dialogService: DialogService,
    private _store: Store
  ) { }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }

  ngOnInit(): void {

    this.tablePizza$ = this.pizzas$.pipe(map(pizzas => pizzas.map((pizza, i) => ({
      ...pizza,
      index: i + 1,
      shortName: this._langPipe.transform(pizza.name),
      minPrice: pizza.price.small,
      minSize: pizza.size.small
    }))))

    this._store.dispatch(new FetchAllPizzas({ page: this.currentPage }));

    this.cols = [
      { field: 'index', header: '#', sortable: true, style: { width: '100px' } },
      { field: 'image', header: 'Image' },
      { field: 'shortName', header: 'Name', sortable: true },
      { field: 'minPrice', header: 'Price', sortable: true },
      { field: 'minSize', header: 'Size', sortable: true },
      { field: 'category', header: 'Category', sortable: true },
      { field: 'options', header: 'labels.options', style: { width: '100px' } }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this._store.dispatch(new FetchAllPizzas({ page: this.currentPage }));

  }

  onManagePizza(pizza?: Pizza): void {
    this.ref = this._dialogService.open(PizzasFormDialogComponent, {
      styleClass: 'd-dialog',
      data: { pizza }
    })
    this.ref.onClose.pipe(filter(result => result)).subscribe();
  }

  onDelete(item: Pizza): void {
    this._cs.delete().pipe(
      filter(result => result),
      mergeMap(() => this._store.dispatch(new DeletePizza(item.id))),
      untilDestroyed(this))
      .subscribe(result => {
        this.currentPage = 1;
        this._ms.add({ severity: 'success', detail: `Піца "${this._langPipe.transform(item.name)}" видалена успішно!` });
        this._cd.detectChanges();
      });
  }
}
