import { Component, OnInit } from '@angular/core';
import { PromotionDataService } from '../../../core/services/promotion-data.service';
import { PromotionStatuses, Promotion } from '../promotion-create/promotions.interface';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {
  promotions$: Observable<Promotion[]>;
  constructor(private http: PromotionDataService) { }

  ngOnInit() {
    this.promotions$ = this.http.getData({ params: { status: [PromotionStatuses.Active, PromotionStatuses.New] } }).pipe(pluck('result'));
  }

}
