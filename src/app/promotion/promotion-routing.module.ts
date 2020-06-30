import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { PromotionResolver } from './promotion.resolver';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';

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
    path: ':id',
    component: PromotionComponent,
    resolve: { pizza: PromotionResolver }
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PromotionRoutingModule { }
