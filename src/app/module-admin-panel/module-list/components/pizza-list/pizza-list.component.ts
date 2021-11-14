import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { Pizza } from '@core/models/pizza.interface';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PizzasState } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.state';
import { DeletePizza, FetchAllPizzas } from 'src/app/module-admin-panel/module-pizzas/pizzas/pizzas.actions';
import { IPaginationResponse } from '@core/models/response.interface';
import { LangPipe } from '@shared/pipe/lang.pipe';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe]
})
export class PizzaListComponent implements OnInit {
  currentPage = 1;
  cols: { field: string; header: string; }[];

  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>
  @Select(PizzasState.pizzasWithPagination) pizzasWithPagination$: Observable<IPaginationResponse<Pizza[]>>

  constructor(
    private _cs: ConfirmService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService,
    private _langPipe: LangPipe,
    private _store: Store
  ) { }

  ngOnInit(): void {

    this._store.dispatch(new FetchAllPizzas({ page: this.currentPage }));

    this.cols = [
      { field: 'image', header: 'Image' },
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' }
    ];
  }

  onPageChange(page: number): void {
    this.currentPage = page + 1;
    this._store.dispatch(new FetchAllPizzas({ page: this.currentPage }));

  }

  onDelete(item: Pizza): void {
    this._cs.delete().subscribe(result => {
      if (result) {

        this._store.dispatch(new DeletePizza(item.id))
          .subscribe(() => {
            this.currentPage = 1;
            // this._store.dispatch(new FetchAllPizzas({ page: this.currentPage }));
            this._ms.add({ severity: 'success', detail: `Піца "${this._langPipe.transform(item.name)}" видалена успішно!` });
            this._cd.detectChanges();
          })
      }
    });
  }
}
