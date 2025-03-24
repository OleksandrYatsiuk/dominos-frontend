import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CardPizzaComponent } from './components/card-pizza/card-pizza.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipe } from '@shared/pipe/lang.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardPizzaComponent,
    LangPipe,
    TranslateModule,
    SelectButtonModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    RouterModule,
  ],
})
export class MainModule { }
