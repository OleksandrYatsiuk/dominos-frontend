import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DrinksListComponent } from './containers/drinks-list/drinks-list.component';
import { DrinksFormDialogComponent } from './components/drinks-form-dialog/drinks-form-dialog.component';
import { MultiLanguageFieldModule } from 'src/app/multi-language-field/multi-language-field.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: DrinksListComponent }];

@NgModule({
  declarations: [DrinksFormDialogComponent],
  imports: [
    CommonModule,
    MultiLanguageFieldModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DrinksModule { }
