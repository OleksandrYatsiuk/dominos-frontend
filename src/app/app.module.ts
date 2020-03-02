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
import { AuthComponent } from './auth/auth.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
