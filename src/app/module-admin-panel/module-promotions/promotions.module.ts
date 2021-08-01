import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionEditComponent } from './components/promotion-edit/promotion-edit.component';
import { PromotionCreateComponent } from './components/promotion-create/promotion-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PromotionResolver } from 'src/app/module-promotions/promotion.resolver';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
  {
    path: ':id/edit',
    component: PromotionEditComponent,
    resolve: { promotion: PromotionResolver }
  },
  {
    path: 'create',
    component: PromotionCreateComponent,
  },
];

@NgModule({
  declarations: [PromotionCreateComponent, PromotionEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  providers: [PromotionResolver]
})
export class PromotionsModule { }
