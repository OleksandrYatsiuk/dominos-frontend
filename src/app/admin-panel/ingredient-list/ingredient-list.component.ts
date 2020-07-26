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
  page=1;
  pages=1
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  
  constructor(
    private http: RootService,
    public dialog: MatDialog,
    public notification: NotificationService) { }

  ngOnInit(): void {
    this.getList(this.page, this.pageSize, 'name')
  }

  getList(page, perPage, name) {
    this.http.getIngredientsList(page, perPage, name)
      .subscribe(({ result, _meta }) => {
        const { total } = _meta.pagination;
        this.length = total;page
        this.ingredients = result;
        this.page= _meta.pagination.page
        this.pages= _meta.pagination.pages
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
  public setPage(page: number) {
    if (page < 1) { page =1 }
    this.http.getIngredientsList(page, 20, 'name').subscribe(({
      result, _meta }) => {
      this.ingredients = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }

}
