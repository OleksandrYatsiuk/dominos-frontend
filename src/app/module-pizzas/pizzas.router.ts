import { Routes } from '@angular/router';
import { PizzasComponent } from './pizzas/pizzas.component';
import { PizzaOverviewComponent } from './pizza-overview/pizza-overview.component';

export default [
    {
        path: '',
        component: PizzasComponent,
        title: 'Pizzas',
    },
    {
        path: ':id',
        component: PizzaOverviewComponent,
    }
] as Routes;