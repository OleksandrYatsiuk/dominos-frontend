import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  exports: [
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
