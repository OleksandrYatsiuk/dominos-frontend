import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { PromotionDataService } from '../core/services/promotion-data.service';
import { PromotionCreateComponent } from './components/promotion-create/promotion-create.component';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';
import { PromotionEditComponent } from './components/promotion-edit/promotion-edit.component';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { PromotionResolver } from './promotion.resolver';
import { CalendarModule } from 'primeng/calendar';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PromotionsListComponent,
  },
  {
    path: 'create',
    component: PromotionCreateComponent,
  },
  {
    path: ':id/edit',
    component: PromotionEditComponent,
    resolve: { promotion: PromotionResolver }
  },
  {
    path: ':id',
    component: PromotionComponent
  }

];


@NgModule({
  declarations: [
    PromotionComponent,
    PromotionCreateComponent,
    PromotionsListComponent,
    PromotionEditComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    CalendarModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [PromotionDataService, PromotionResolver],
})
export class PromotionsModule { }
