import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from '../shared';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { UsersListComponent } from './users-list/users-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../shared/components/delete-modal/delete-modal.component';



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
  entryComponents: [DeleteModalComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    NgbActiveModal
  ]
})
export class AdminPanelModule { }
