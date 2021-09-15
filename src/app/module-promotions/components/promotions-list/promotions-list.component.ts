import { Component, OnInit } from '@angular/core';
import { PromotionDataService } from '../../../core/services/promotion-data.service';
import { Promotion } from '../../../core/models/promotions/promotions.model';
import { Observable, pluck } from 'rxjs';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {
  promotions$: Observable<ModelPromotionPublic[]>;
  constructor(private http: PromotionDataService) { }

  ngOnInit(): void {
    this.promotions$ = this.http.queryPromotionPublicList({ params: { isActive: true } }).pipe(pluck('result'));
  }

}
