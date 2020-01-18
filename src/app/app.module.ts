import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './shared/pizza-filter.pipe';
import { HeaderComponent } from './shared/header/header.component';
import { ContentComponent } from './main/content/content.component';
import { PizzaItemComponent } from './main/content/pizza-item/pizza-item.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreatePizzaComponent,
    PizzaFilterPipe,
    HeaderComponent,
    PizzaItemComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
