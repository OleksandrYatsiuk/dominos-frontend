import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsMapComponent } from './components/shops-map/shops-map.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: ShopsMapComponent }];

@NgModule({
  declarations: [
    ShopsMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopsMapModule { }
