import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CardPizzaComponent } from './components/card-pizza/card-pizza.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PromotionsSliderComponent } from './components/promotions-slider/promotions-slider.component';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { BasketInModule } from '@shared/components/basket-in/basket-in/basket-in.module';

@NgModule({
  declarations: [
    MainComponent,
    CardPizzaComponent,
    PromotionsSliderComponent,
    LangPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SelectButtonModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SwiperModule,
    RouterModule,
    BasketInModule
  ],
  exports: [
    MainComponent,
    TranslateModule,
    LazyLoadImageModule,
    CardPizzaComponent,
    LangPipe
  ]
})
export class MainModule { }
