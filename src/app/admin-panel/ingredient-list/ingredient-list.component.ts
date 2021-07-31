import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  public ingredients;
  displayedColumns: string[] = ['id', 'name', 'delete'];
  page = 1;
  pages = 1
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: any;
  public collectionSize: number;

  constructor(
    private http: RootService,
    private _cs: ConfirmService,
    public notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getList(this.page, this.pageSize, 'name')
  }

  getList(page: number, limit: number, sort = 'name') {
    this.http.getIngredientsList({ params: { page, limit, sort } })
      .subscribe(({ result, _meta }) => {
        const { total } = _meta.pagination;
        this.length = total;
        this.ingredients = result;
        this.page = _meta.pagination.page;
        this.pages = _meta.pagination.pages;
        this.collectionSize = _meta.pagination.total / this.pageSize
      });
  }

  delete(item): void {
    this._cs.delete().subscribe(res => {
      if (res) {
        this.getList(1, this.pageSize, 'name');
        // this.notification.showSuccess(`Ingredient "${item.name}" was deleted successfully`)
        this.notification.showDanger('Delete ingredient was not realise!')
      }
    });
  }

  showPage(event: number) {
    this.getList(event, this.pageSize, 'name')
  }

}
