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
import { SelectComponent } from './components/select/select.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { LoginComponent } from './components/login/login.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DatePickerComponent } from './components/datepicker/datepicker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardPizzaComponent } from './components/card-pizza/card-pizza.component';


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
    SelectComponent,
    ValidationErrorComponent,
    MultiSelectComponent,
    DatePickerComponent,
    TimePickerComponent,
    CardPizzaComponent,
    // pipes
    PizzaFilterPipe,
    CustomLabelPipe,
    ExtractPipe,
    // directives
    MobilePhoneDirective

  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    NgxPermissionsModule.forRoot(),
    DropdownModule,
    SelectButtonModule

  ],
  exports: [
    //components
    MultiSelectComponent,
    BasketCardItemComponent,
    SpinButtonComponent,
    FormItemComponent,
    SelectComponent,
    ValidationErrorComponent,
    FileUploaderComponent,
    DatePickerComponent,
    TimePickerComponent,
    NotificationComponent,
    CardPizzaComponent,
    //modules
    FormsModule,
    DropdownModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    // AgmCoreModule,
    NgxPermissionsModule,
    NgxMaterialTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    //pipes
    PizzaFilterPipe,
    ExtractPipe,
    //directives
    MobilePhoneDirective
  ]

})
export class SharedModule { }
