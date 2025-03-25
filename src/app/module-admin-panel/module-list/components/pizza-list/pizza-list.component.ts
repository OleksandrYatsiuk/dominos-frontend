import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { Pizza } from '@core/models/pizza.interface';
import { filter, mergeMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { DeletePizza, FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DatePipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { stubImage } from 'src/utils/stubs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from '@shared/components/table/table.component';
import { ITableColumn } from '@shared/components/table/interfaces';
import { ActionsComponent, ActionsFn } from '@shared/components/actions/actions.component';
import { GlobalTableSearchComponent } from '@shared/components/table/global-search/global-search.component';
import { PizzasFormDialogComponent } from 'src/app/module-admin-panel/module-pizzas/components/pizzas-form-dialog/pizzas-form-dialog.component';

interface PizzaTableRecord {
  original: Pizza;
  id: string;
  name: string;
  price: number;
  size: number;
};

@UntilDestroy()
@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe, DatePipe, DialogService],
  standalone: true,
  imports: [TableModule, ActionsComponent, GlobalTableSearchComponent, InputTextModule, TranslateModule, TableComponent]
})
export class PizzaListComponent implements OnInit, OnDestroy {
  page = signal(1);
  stubImage = stubImage;

  pizzas = computed(() => {
    const list = this._store.selectSignal(PizzasState.pizzas);

    if (list()) {
      return list().map((pizza) => this.transformPizzaRecord(pizza));
    }

    return list();
  });

  actions: ActionsFn<PizzaTableRecord> = (record) => [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'icon icon-edit',
      command: () => {
        this.onManagePizza(record);
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
  ]

  cols = signal<ITableColumn[]>([
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'size', header: 'Size', sortable: true },
    { field: 'options', header: '', width: '100px' }
  ]);

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

  transformPizzaRecord(pizza: Pizza): PizzaTableRecord {
    return {
      original: pizza,
      id: pizza.id,
      name: this._langPipe.transform(pizza.name),
      price: pizza.price.small,
      size: pizza.size.small,
    }
  }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPizzas({ page: this.page() }));
  }

  onPageChange(page: number): void {
    this.page.update(() => page + 1);
    this._store.dispatch(new FetchAllPizzas({ page: this.page() }));
  }

  onManagePizza(pizza?: PizzaTableRecord): void {
    this.ref = this._dialogService.open(PizzasFormDialogComponent, {
      styleClass: 'd-dialog',
      focusOnShow: false,
      data: { pizza: pizza?.original }
    })
    this.ref.onClose.pipe(filter(result => result)).subscribe(() => {
      this._store.dispatch(new FetchAllPizzas({ page: this.page() }));
    });
  }

  onDelete(item: PizzaTableRecord): void {
    this._cs.delete().pipe(
      untilDestroyed(this),
      filter(result => !!result),
      mergeMap(() => this._store.dispatch(new DeletePizza(item.id))),
    )
      .subscribe(() => {
        this.page.set(1);
        this._ms.add({ severity: 'success', detail: `Піца "${this._langPipe.transform(item.original.name)}" видалена успішно!` });
        this._cd.detectChanges();
      });
  }
}
