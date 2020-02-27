import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryGuard } from './core/guards/delivery.guard';

// Lazy loading for modules
const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  { path: 'delivery', canActivate: [DeliveryGuard], loadChildren: () => import('./delivery/delivery.module').then(mod => mod.DeliveryModule) },
  { path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [DeliveryGuard],

})
export class AppRoutingModule { }
