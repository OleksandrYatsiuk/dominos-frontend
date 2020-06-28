import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { PromotionResolver } from './promotion.resolver';

const routes: Routes = [

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
