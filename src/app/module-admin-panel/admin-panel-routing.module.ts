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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
