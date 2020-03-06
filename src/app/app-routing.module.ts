import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { DeliveryGuard } from './core/guards/delivery.guard';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

// Lazy loading for modules
const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(mod => mod.DeliveryModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [DeliveryGuard],

})
export class AppRoutingModule { }
