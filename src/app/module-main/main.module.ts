import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsSliderComponent } from './components/promotions-slider/promotions-slider.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CardPizzaComponent } from './components/card-pizza/card-pizza.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MainComponent,
    CardPizzaComponent,
    PromotionsSliderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SelectButtonModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    MainComponent,
    TranslateModule,
    LazyLoadImageModule,
    CardPizzaComponent,
  ]
})
export class MainModule { }
