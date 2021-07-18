import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(mod => mod.DeliveryModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'promotion', loadChildren: () => import('./promotion/promotion.module').then(mod => mod.PromotionModule) },
  { path: 'admin', loadChildren: () => import('./admin-panel/admin-panel.module').then(mod => mod.AdminPanelModule) },
  { path: '', loadChildren: () => import('./products/products-list.module').then(mod => mod.ProductsListModule) },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected'
    }),
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
