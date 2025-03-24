import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionCreateComponent } from './containers/promotion-create/promotion-create.component';
import { RouterModule, Routes } from '@angular/router';
import { PromotionResolver } from 'src/app/module-promotions/promotion.resolver';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PromotionEditComponent } from './containers/promotion-edit/promotion-edit.component';

const routes: Routes = [
  {
    path: ':id/edit',
    component: PromotionEditComponent,
  },
  {
    path: 'create',
    component: PromotionCreateComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    InputSwitchModule,
    RouterModule.forChild(routes)
  ],
  providers: [PromotionResolver]
})
export class PromotionsModule { }
