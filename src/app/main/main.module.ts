import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';



@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MainComponent }
    ]),
    SelectDropDownModule
  ]
})
export class MainModule { }
