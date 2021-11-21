import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => ((await import('./module-list/module-list.module')).ListModule),
  },
  {
    path: 'pizzas',
    loadChildren: async () => ((await import('./module-pizzas/module-pizzas.module')).ModulePizzasModule)
  },
  {
    path: 'promotions',
    loadChildren: async () => ((await import('./module-promotions/promotions.module')).PromotionsModule)
  },
  {
    path: 'drinks',
    loadChildren: async () => ((await import('./module-drinks/drinks.module')).DrinksModule)
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
