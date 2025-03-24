import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { Pizza } from '@core/models/pizza.interface';
import { TableItem } from '@core/models/table.interface';
import { filter, mergeMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { DeletePizza, FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DatePipe, NgStyle } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PizzasFormDialogComponent } from 'src/app/module-admin-panel/module-pizzas/components/pizzas-form-dialog/pizzas-form-dialog.component';
import { stubImage } from 'src/utils/stubs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';

interface PizzaTableRecord {
  original: Pizza;
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
  imports: [TableModule, NgStyle, InputTextModule, TranslateModule]
})
export class PizzaListComponent implements OnInit, OnDestroy {
  page = signal(1);
  cols: TableItem[];
  stubImage = stubImage;

  pizzas = computed(() => {
    const list = this._store.selectSignal(PizzasState.pizzas);

    if (list()) {
      return list().map((pizza) => this.transformPizzaRecord(pizza));
    }

    return list();
  });

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
      name: this._langPipe.transform(pizza.name),
      price: pizza.price.small,
      size: pizza.size.small,
    }
  }

  ngOnInit(): void {
    this._store.dispatch(new FetchAllPizzas({ page: this.page() }));

    this.cols = [
      { field: 'name', header: 'Name', sortable: true },
      { field: 'price', header: 'Price', sortable: true },
      { field: 'size', header: 'Size', sortable: true },
      // { field: 'category', header: 'Category', sortable: true },
      { field: 'options', header: 'labels.options', style: { width: '100px' } }
    ];
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

  onDelete(item: Pizza): void {
    this._cs.delete().pipe(
      untilDestroyed(this),
      filter(result => !!result),
      mergeMap(() => this._store.dispatch(new DeletePizza(item.id))),
    )
      .subscribe(() => {
        this.page.set(1);
        this._ms.add({ severity: 'success', detail: `Піца "${this._langPipe.transform(item.name)}" видалена успішно!` });
        this._cd.detectChanges();
      });
  }
}
