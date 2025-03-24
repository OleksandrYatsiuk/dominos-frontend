import { Routes } from '@angular/router';
import { PromotionsListComponent } from './components/promotions-list/promotions-list.component';
import { PromotionComponent } from './components/promotion/promotion.component';

export default [
    {
        path: '',
        component: PromotionsListComponent,
    },
    {
        path: ':id',
        component: PromotionComponent,
    }
] as Routes;