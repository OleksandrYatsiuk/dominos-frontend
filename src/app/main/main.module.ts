import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ProductsListModule } from '../products/products-list.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsListModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainModule
      }
    ]),
    SelectDropDownModule,
  ],
})
export class MainModule { }
