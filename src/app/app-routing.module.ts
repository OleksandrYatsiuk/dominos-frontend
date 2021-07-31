import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './module-main/components/main/main.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pizzas', loadChildren: () => import('./module-pizzas/pizzas.module').then(mod => mod.PizzaModule) },
  { path: 'promotions', loadChildren: () => import('./module-promotions/promotions.module').then(mod => mod.PromotionsModule) },
  { path: 'delivery', loadChildren: () => import('./module-delivery/delivery.module').then(mod => mod.DeliveryModule) },
  { path: 'auth', loadChildren: () => import('./module-auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'admin', loadChildren: () => import('./module-admin-panel/admin-panel.module').then(mod => mod.AdminPanelModule) },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected'
    }),
  ]
})
export class AppRoutingModule { }
