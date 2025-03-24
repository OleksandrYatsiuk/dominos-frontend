import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './containers/drinks/drinks.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DrinkCardComponent } from './components/drink-card/drink-card.component';
import { SharedModule } from '@shared/shared.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BasketInComponent } from '@shared/components/basket-in/basket-in/basket-in.component';

const routes: Routes = [{ path: '', component: DrinksComponent }];


@NgModule({
  declarations: [DrinksComponent, DrinkCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    SelectButtonModule,
    BasketInComponent,
  ]
})
export class DrinksModule { }
