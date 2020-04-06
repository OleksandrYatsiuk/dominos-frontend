import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DeliveryGuard } from './core/guards/delivery.guard';

// Lazy loading for modules
const routes: Routes = [
  { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(mod => mod.DeliveryModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: '', loadChildren: () => import('./products/products-list.module').then(mod => mod.ProductsListModule), data: { preload: true } },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule],
  providers: [DeliveryGuard],

})
export class AppRoutingModule { }
