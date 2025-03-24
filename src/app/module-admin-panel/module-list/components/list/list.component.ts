import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PromotionListComponent } from '../promotion-list/promotion-list.component';
import { TabPanel, TabViewModule } from 'primeng/tabview';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PromotionListComponent, TabViewModule, TabPanel, TranslateModule]
})
export class ListComponent { }
