import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  public page = 1;
  public pageSize = 20;
  shops: any;
  collectionSize: number;
  constructor(
    private http: ShopService,
    public modal: ModalService,
    public notification: NotificationService) { }

  ngOnInit() {
    this.getList(this.page, this.pageSize)
  }

  public getList(page: number, limit: number, sort = 'name') {
    this.http.queryShopsList({ params: { page, limit, sort } })
      .subscribe(({ result, _meta }) => {
        this.shops = result;
        this.page = _meta.pagination.page;
        this.collectionSize = _meta.pagination.total / this.pageSize
      });
  }
  public showPage(event: number) {
    this.getList(event, this.pageSize)
  }

  public delete(item: any): void {
    this.modal.openDeleteModal(`shop "${item.address}"`).result
      .then(res => {
        this.http.remove(item.id).subscribe(res => {
          this.getList(this.page, this.pageSize);
          this.notification.showSuccess(`Shop "${item.address}" was deleted successfully!`);
        }, (e) => {
          this.notification.showDanger(e.result);
        })
      })
      .catch(e => e)
  }
}
