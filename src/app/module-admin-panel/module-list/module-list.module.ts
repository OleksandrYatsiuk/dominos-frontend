import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { DrinksListComponent } from './components/drinks-list/drinks-list.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    DeliveryListComponent,
    ShopListComponent,
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
  ]
})
export class ListModule { }
