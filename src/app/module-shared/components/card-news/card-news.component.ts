import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNewsComponent {
  @Input() news: ModelPromotionPublic;
  defaultImage = '/assets/img/stub-image.png';
  status = PromotionStatuses;
  constructor() { }



}
