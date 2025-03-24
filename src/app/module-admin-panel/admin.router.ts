import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { PromotionListComponent } from './module-list/components/promotion-list/promotion-list.component';
import { PizzaListComponent } from './module-list/components/pizza-list/pizza-list.component';

export default [
    {
        path: '',
        component: AdminPanelComponent,
        children: [
            {
                path: 'promotions',
                component: PromotionListComponent,
            },
            {
                path: 'pizzas',
                component: PizzaListComponent,
            },
        ],
    },
    {
        path: 'promotions',
        loadChildren: () => import('./module-promotions/promotions.router'),
    },
] as Routes;