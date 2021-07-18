import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { PromotionDataService } from './promotion-data.service';
import { PromotionResolver } from './promotion.resolver';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { SharedModule } from '@shared/shared.module';



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
    SharedModule
  ], 
  providers:[PromotionDataService, PromotionResolver],
})
export class PromotionModule { }
