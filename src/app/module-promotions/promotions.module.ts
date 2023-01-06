import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { RouterModule, Routes } from '@angular/router';
import { PromotionComponent } from './components/promotion/promotion.component';


const routes: Routes = [
  { path: '', component: PromotionsListComponent },
  { path: ':id', component: PromotionComponent }
];


@NgModule({
  declarations: [
    PromotionComponent,
    PromotionsListComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PromotionsModule { }
