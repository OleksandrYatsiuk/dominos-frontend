import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: MainComponent}
    ])
  ]
})
export class MainModule { }
