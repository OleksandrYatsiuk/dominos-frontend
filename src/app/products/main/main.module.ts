import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListModule } from '../products-list.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsListModule,
    RouterModule.forChild(routes)
  ],
})
export class MainModule { }
