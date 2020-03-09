import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootService } from './shared/root.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ParamInterceptor } from './core/token.interceptor';
import { ErrorInterseptor } from './core/error.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { PizzaComponent } from './pizza/pizza.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent, PizzaComponent,],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule

  ],
  exports: [
    SharedModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    RootService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterseptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
