import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    AdminPanelComponent,
    DeliveryListComponent,
    UsersListComponent,
    PromotionListComponent,
    PizzaListComponent,
    ShopListComponent,
    IngredientListComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ],
  providers: []
})
export class AdminPanelModule { }
