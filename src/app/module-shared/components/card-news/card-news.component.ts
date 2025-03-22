import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';
import { stubImage } from 'src/utils/stubs';

@Component({
    selector: 'app-card-news',
    templateUrl: './card-news.component.html',
    styleUrls: ['./card-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardNewsComponent {
  @Input() news: ModelPromotionPublic;
  defaultImage = stubImage;
  status = PromotionStatuses;
  constructor() { }



}
