import { Component, OnInit } from '@angular/core';
import { PromotionDataService } from '../promotion-data.service';
import { PromotionStatuses, Promotion } from '../promotion-create/promotions.interface';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {
  promotions: Array<Promotion>;
  constructor(private http: PromotionDataService) { }

  ngOnInit() {
    this.http.getData({ params: { status: [PromotionStatuses.Active, PromotionStatuses.New] } }).subscribe(res => {
      this.promotions = res.result;
    })
  }

}
