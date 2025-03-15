import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { CustomLabelPipe } from './pipe/custom-label.pipe';
import { FormItemComponent } from './components/form-item/form-item.component';
import { ExtractPipe } from './pipe/extract.pipe';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { LoginComponent } from './components/login/login.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardNewsComponent } from './components/card-news/card-news.component';
import { MainModule } from '../module-main/main.module';
import { TranslateOptionsPipe } from './pipe/translate-options.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { BasketInModule } from './components/basket-in/basket-in/basket-in.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '../module-auth/state/auth.state';

@NgModule({ declarations: [
        // components
        LoginComponent,
        FileUploaderComponent,
        BasketCardItemComponent,
        SpinButtonComponent,
        FormItemComponent,
        ValidationErrorComponent,
        // pipes
        PizzaFilterPipe,
        CustomLabelPipe,
        ExtractPipe,
        TranslateOptionsPipe,
        // directives
        MobilePhoneDirective,
        CardNewsComponent,
    ],
    exports: [
        //components
        BasketCardItemComponent,
        SpinButtonComponent,
        FormItemComponent,
        ValidationErrorComponent,
        FileUploaderComponent,
        CardNewsComponent,
        //modules
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        ToastModule,
        MainModule,
        //pipes
        PizzaFilterPipe,
        ExtractPipe,
        TranslateOptionsPipe,
        //directives
        MobilePhoneDirective,
    ], imports: [FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([AuthState]),
        DropdownModule,
        SelectButtonModule,
        RouterModule,
        MainModule,
        TranslateModule,
        ToastModule,
        BasketInModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }
