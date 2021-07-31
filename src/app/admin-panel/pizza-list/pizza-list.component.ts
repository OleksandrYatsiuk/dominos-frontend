import { Component, OnInit } from '@angular/core';
import { PizzaDataService } from 'src/app/products/pizza/pizza-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from '@core/services/confirm.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  public page = 1;
  public pages = 1;
  public pizzas: object[];
  public collectionSize: number
  constructor(private http: PizzaDataService,
    private _cs: ConfirmService,
    public notification: NotificationService
  ) { }

  ngOnInit() {
    this.http.getPizzas({ params: { page: this.page, limit: 20 } }).subscribe(({
      result, _meta }) => {
      this.pizzas = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
      this.collectionSize = _meta.pagination.total / 20
    });
  }


  public setPage(page: number): void {
    if (page < 1) { page = 1 }
    this.http.getPizzas({ params: { page: page, limit: 20 } }).subscribe(({
      result, _meta }) => {
      this.pizzas = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }

  showPage(event: number) {
    this.http.getPizzas({ params: { page: event, limit: 20 } }).subscribe(({
      result, _meta }) => {
      this.pizzas = result;
      this.page = _meta.pagination.page;
      this.pages = _meta.pagination.pages;
    });
  }

  delete(item): void {
    this._cs.delete().subscribe(result => {
      if (result) {
        this.http.remove(item.id).subscribe(res => {
          this.setPage(this.page);
          this.notification.showSuccess(`Піца "${item.name}" видалена успішно!`);
        })
      }
    });
  }
}
