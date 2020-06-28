import { Component, OnInit } from '@angular/core';
import { PromotionDataService } from 'src/app/promotion/promotion-data.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  constructor(
    private http: PromotionDataService,
    public dialog: MatDialog,
    public notification: NotificationService
  ) { }
  page = 1;
  pages = 1;
  promotions: any;
  ngOnInit() {
    this.http.getData({ params: { page: this.page, limit: 20 } }).subscribe(({ result, _meta }) => {

      this.promotions = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }


  public setPage(page: number): void {
    if (page < 1) { page = 1 }
    this.http.getData({ params: { page: page, limit: 20 } }).subscribe(({
      result, _meta }) => {
      this.promotions = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }

  public delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '300px',
      data: { name: `Ви дійсно хочете видалити акцію "${item.title}" ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.remove(item.id).subscribe(res => {
          this.setPage(this.page);
          this.notification.open({
            data: `Акція "${item.title}" видалена успішно!`
          });
        }, (e) => {
          this.notification.open({
            data: {
              status: false,
              message: e.result
            }
          });
        })
      }
    });
  }
}
