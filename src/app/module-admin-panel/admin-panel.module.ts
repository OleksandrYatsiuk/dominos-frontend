import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SharedModule } from 'src/app/module-shared/shared.module';
import { MultiLanguageFieldModule } from '../multi-language-field/multi-language-field.module';



@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    MultiLanguageFieldModule
  ],
  providers: []
})
export class AdminPanelModule { }
