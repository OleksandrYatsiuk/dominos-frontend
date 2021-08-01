import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionDataService } from '../core/services/promotion-data.service';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { PromotionResolver } from './promotion.resolver';
import { CalendarModule } from 'primeng/calendar';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RouterModule, Routes } from '@angular/router';
import { PromotionComponent } from './components/promotion/promotion.component';


const routes: Routes = [
  {
    path: '',
    component: PromotionsListComponent,
  },
  {
    path: ':id',
    component: PromotionComponent
  }
];


@NgModule({
  declarations: [
    PromotionComponent,
    PromotionsListComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    CalendarModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [PromotionResolver],
})
export class PromotionsModule { }
