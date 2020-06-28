import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { UsersListComponent } from './users-list/users-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';



@NgModule({
  declarations: [
    AdminPanelComponent,
    DeliveryListComponent,
    UsersListComponent,
    PromotionListComponent,
    PizzaListComponent,
    ShopListComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  entryComponents: [ModalComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AdminPanelModule { }
