import { DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelPromotionPublic, PromotionStatuses } from '@core/models/promotions/promotions-public.model';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { stubImage } from 'src/utils/stubs';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe, TranslateModule, LazyLoadImageModule, RouterModule],
  providers: [DatePipe],
})
export class CardNewsComponent {
  promo = input<ModelPromotionPublic>();

  defaultImage = stubImage;

  status = PromotionStatuses;
}
