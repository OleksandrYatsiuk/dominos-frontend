import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { BrowserModule } from '@angular/platform-browser';

// Lazy loading for modules
const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  // {
  //   path: 'delivery',
  //   loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
  // },
  { path: 'delivery', component: DeliveryComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
