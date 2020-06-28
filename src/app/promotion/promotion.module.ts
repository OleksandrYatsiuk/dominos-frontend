import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionRoutingModule } from './promotion-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared';
import { PromotionComponent } from './promotion.component';
import { PromotionDataService } from './promotion-data.service';
import { PromotionResolver } from './promotion.resolver';



@NgModule({
  declarations: [
    PromotionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PromotionRoutingModule,
    SharedModule
  ], 
  providers:[PromotionDataService, PromotionResolver],
})
export class PromotionModule { }
