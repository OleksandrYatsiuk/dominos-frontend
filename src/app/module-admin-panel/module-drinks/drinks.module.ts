import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DrinksListComponent } from './containers/drinks-list/drinks-list.component';

const routes: Routes = [
  { path: "", component: DrinksListComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DrinksModule { }
