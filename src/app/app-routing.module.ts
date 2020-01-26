import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DeliveryComponent } from './delivery/delivery.component';

// Lazy loading for modules
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
