import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
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
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { BasketInModule } from './components/basket-in/basket-in/basket-in.module';

@NgModule({
    declarations: [
        // components
        SpinButtonComponent,
        // pipes
        PizzaFilterPipe,
        CustomLabelPipe,
        ExtractPipe,
        // directives
        MobilePhoneDirective,
        CardNewsComponent,
    ],
    exports: [
        //component
        SpinButtonComponent,
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
        //directives
        MobilePhoneDirective,
    ],
    imports: [
        FormsModule,
        CommonModule,
        ValidationErrorComponent,
        FormItemComponent,
        FileUploaderComponent,
        ReactiveFormsModule,
        DropdownModule,
        SelectButtonModule,
        RouterModule,
        MainModule,
        TranslateModule,
        ToastModule,
        BasketInModule,
        BasketCardItemComponent,
    ],
})
export class SharedModule { }
