import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TabViewModule } from 'primeng/tabview';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { PromotionListComponent } from './components/promotion-list/promotion-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';

const routes: Routes = [{ path: '', component: ListComponent }];


@NgModule({
  declarations: [
    ListComponent,
    PizzaListComponent,
    PromotionListComponent,
    UsersListComponent,
    DeliveryListComponent,
    ShopListComponent,
    IngredientListComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    PaginatorModule,
    TranslateModule,
    TableModule,
    RouterModule.forChild(routes)
  ]
})
export class ListModule { }
