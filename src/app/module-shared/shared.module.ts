import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { NgxPermissionsModule } from 'ngx-permissions';
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

@NgModule({
  declarations: [
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
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
    DropdownModule,
    SelectButtonModule,
    MainModule,
    TranslateModule,
    ToastModule
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
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ToastModule,
    // AgmCoreModule,
    NgxPermissionsModule,
    MainModule,
    //pipes
    PizzaFilterPipe,
    ExtractPipe,
    TranslateOptionsPipe,
    //directives
    MobilePhoneDirective,
  ]

})
export class SharedModule { }
