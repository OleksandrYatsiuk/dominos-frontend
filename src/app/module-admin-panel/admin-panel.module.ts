import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from 'src/app/module-shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // AdminPanelRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class AdminPanelModule { }
