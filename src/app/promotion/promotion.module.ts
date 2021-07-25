import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { PromotionDataService } from './promotion-data.service';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { SharedModule } from '@shared/shared.module';
import { PromotionResolver } from './promotion.resolver';
import { CalendarModule } from 'primeng/calendar';
import { SwiperModule } from 'ngx-swiper-wrapper';


@NgModule({
  declarations: [
    PromotionComponent,
    PromotionCreateComponent,
    PromotionsListComponent,
    PromotionEditComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    SwiperModule,
    CalendarModule,
    SharedModule
  ],
  providers: [PromotionDataService, PromotionResolver],
})
export class PromotionModule { }
