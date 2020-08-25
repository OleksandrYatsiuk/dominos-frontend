import { Component, OnInit } from '@angular/core';
import { PromotionDataService } from 'src/app/promotion/promotion-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Promotion } from 'src/app/promotion/promotion-create/promotions.interface';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  constructor(
    private http: PromotionDataService,
    public modal: ModalService,
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


  public delete(item:Promotion): void {
    this.modal.openDeleteModal(`promotion "${item.title}"`).result
      .then(res => {
        this.http.remove(item.id).subscribe(res => {
          this.getList(this.page, this.pageSize);
          this.notification.showSuccess(`Акція "${item.title}" видалена успішно!`);
        }, (e) => {
          this.notification.showDanger(e.result);
        })
      })
      .catch(e => e)
  }
}
