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
  pageSize = 20;
  promotions: any;
  collectionSize: number;
  ngOnInit() {
    this.getList(this.page, this.pageSize)
  }
  public getList(page: number, limit: number, sort = 'name') {
    this.http.getData({ params: { page, limit, sort } })
      .subscribe(({ result, _meta }) => {
        this.promotions = result;
        this.page = _meta.pagination.page;
        this.pageSize = _meta.pagination.pages;
        this.collectionSize = _meta.pagination.total / this.pageSize
      });
  }

  public showPage(event: number) {
    this.getList(event, this.pageSize)
  }


  public delete(item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { name: `Ви дійсно хочете видалити акцію "${item.title}" ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.remove(item.id).subscribe(res => {
          this.getList(this.page, this.pageSize);
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
