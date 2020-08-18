import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';
import { MatDialog, PageEvent } from '@angular/material';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

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
  pageEvent: PageEvent;
  public collectionSize: number;

  constructor(
    private http: RootService,
    public dialog: MatDialog,
    public notification: NotificationService) { }

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
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: `Ви дійсно хочете видалити інгредієнт "${item.name}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getList(1, this.pageSize, 'name');
      }
    });
  }

  public showPage(event: number) {
    this.getList(event, this.pageSize, 'name')
  }

}
