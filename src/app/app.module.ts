import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePizzaComponent } from './create-pizza/create-pizza.component';
import { FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './shared/pizza-filter.pipe';
import { HeaderComponent } from './main/header/header.component'
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreatePizzaComponent,
    PizzaFilterPipe,
    HeaderComponent
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
