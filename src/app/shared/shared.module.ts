import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CustomLabelPipe } from './pipe/custom-label.pipe';
import { FormItemComponent } from './components/form-item/form-item.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ExtractPipe } from './pipe/extract.pipe';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { LoginComponent } from './components/login/login.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardPizzaComponent } from './components/card-pizza/card-pizza.component';
import { CardNewsComponent } from './components/card-news/card-news.component';


@NgModule({
  declarations: [
    // components
    LoginComponent,
    FileUploaderComponent,
    BasketCardItemComponent,
    DeleteModalComponent,
    NotificationComponent,
    SpinButtonComponent,
    FormItemComponent,
    ValidationErrorComponent,
    CardPizzaComponent,
    // pipes
    PizzaFilterPipe,
    CustomLabelPipe,
    ExtractPipe,
    // directives
    MobilePhoneDirective,
    CardNewsComponent

  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    NgbToastModule,
    NgxPermissionsModule.forRoot(),
    DropdownModule,
    SelectButtonModule

  ],
  exports: [
    //components
    BasketCardItemComponent,
    SpinButtonComponent,
    FormItemComponent,
    ValidationErrorComponent,
    FileUploaderComponent,
    NotificationComponent,
    CardPizzaComponent,
    CardNewsComponent,
    //modules
    FormsModule,
    DropdownModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    // AgmCoreModule,
    NgxPermissionsModule,
    NgbToastModule,
    //pipes
    PizzaFilterPipe,
    ExtractPipe,
    //directives
    MobilePhoneDirective
  ]

})
export class SharedModule { }
