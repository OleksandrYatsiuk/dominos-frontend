import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { PizzaOverviewComponent } from '../pizza-overview/pizza-overview.component';
import { PizzaOverviewResolver } from '../pizza-overview/pizza-overview.resolver';
import { PizzaOverviewDataService } from '../pizza-overview/pizza-overview-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
    PizzaOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MainComponent },
      {
        path: 'pizza/:id', component: PizzaOverviewComponent,
        resolve: { pizza: PizzaOverviewResolver }
      }
    ]),
    SelectDropDownModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    PizzaOverviewResolver, PizzaOverviewDataService
  ]
})
export class MainModule { }
