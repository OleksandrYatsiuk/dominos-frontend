import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelPromotion, PromotionStatuses } from 'src/app/module-admin-panel/module-promotions/components/promotion-create/promotions.interface';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNewsComponent {
  @Input() news: ModelPromotion;
  defaultImage = '/assets/data/default_image.png';
  status = PromotionStatuses;
  constructor() { }



}
