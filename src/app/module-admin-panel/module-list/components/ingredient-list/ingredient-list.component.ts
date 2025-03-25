import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmService } from '@core/services/confirm.service';
import { IMultiLanguageDictionary } from '@core/models/dictionary';
import { Observable } from 'rxjs';
import { IngredientsService } from '@core/services/ingredients.service';
import { TableComponent } from '@shared/components/table/table.component';
import { GlobalTableSearchComponent } from '@shared/components/table/global-search/global-search.component';
import { ActionsComponent, ActionsFn } from '@shared/components/actions/actions.component';
import { ITableColumn } from '@shared/components/table/interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LangPipe } from '@shared/pipe/lang.pipe';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, LangPipe, TableComponent, GlobalTableSearchComponent, ActionsComponent, RouterModule],
})
export class IngredientListComponent {
  ingredients$: Observable<IMultiLanguageDictionary[]>;
  page = signal(1);

  rows = signal(10);

  cols = signal<ITableColumn[]>([
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'createdAt', header: 'createdAt' },
    { field: 'updatedAt', header: 'updatedAt' },
    { field: 'actions', header: '', width: '100px' },
  ]);

  constructor(
    private _is: IngredientsService,
    private _cs: ConfirmService,
    private _ms: MessageService
  ) { }


  actions: ActionsFn<IMultiLanguageDictionary> = (record) => [
    {
      id: 'delete',
      icon: 'icon icon-trash',
      label: 'Delete',
      command: () => {
        this.onDelete(record);
      }
    }
  ];

  onDelete(item: IMultiLanguageDictionary): void {
    this._cs.delete().subscribe(() => {
      this.ingredients.reload();
      this._ms.add({ severity: 'success', detail: `Ingredient "${item.name}" was deleted successfully` });
    });
  }

  ingredients = rxResource({
    request: () => ({ page: this.page(), rows: this.rows() }),
    loader: ({ request }) => this._is.getIngredientsList({ page: request.page, limit: request.rows }),
  });

}
