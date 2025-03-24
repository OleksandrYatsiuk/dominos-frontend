import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TabViewModule } from 'primeng/tabview';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';
import { PaginatorModule } from 'primeng/paginator';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { IngredientListComponent } from './components/ingredient-list/ingredient-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { DrinksListComponent } from './components/drinks-list/drinks-list.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ImageModule } from 'primeng/image';
const routes: Routes = [{ path: '', component: ListComponent }];


@NgModule({
  declarations: [
    UsersListComponent,
    DeliveryListComponent,
    ShopListComponent,
    IngredientListComponent,
    DrinksListComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    PaginatorModule,
    TranslateModule,
    TableModule,
    SharedModule,
    InlineSVGModule,
    ImageModule,
    RouterModule.forChild(routes)
  ]
})
export class ListModule { }
