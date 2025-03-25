import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Table } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from '../table.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-global-table-search',
  imports: [SearchComponent, TranslateModule],
  templateUrl: './global-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalTableSearchComponent {
  table = input.required<Table | TableComponent>();

  searchId = input.required<string>();
}
