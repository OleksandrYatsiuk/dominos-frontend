import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { SharedModule } from '../shared';
import { PromotionComponent } from './promotion.component';
import { PromotionDataService } from './promotion-data.service';
import { PromotionResolver } from './promotion.resolver';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';



@NgModule({
  declarations: [
    PromotionComponent,
    PromotionCreateComponent,
    PromotionsListComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    SharedModule
  ], 
  providers:[PromotionDataService, PromotionResolver],
})
export class PromotionModule { }
