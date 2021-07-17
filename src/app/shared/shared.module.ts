import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NotificationComponent } from './components/notification/notification.component';
import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CustomLabelPipe } from './pipe/custom-label.pipe';
import { FormItemComponent } from './components/form-item/form-item.component';
import { MenuDirective } from './components/menu.directive';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ExtractPipe } from './pipe/extract.pipe';
import { SelectComponent } from './components/select/select.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { LoginComponent } from './components/login/login.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DatePickerComponent } from './components/datepicker/datepicker.component';
import { MenuComponent } from './layout/header/menu/menu.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    // components
    LoginComponent,
    FileUploaderComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
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
    // pipes
    PizzaFilterPipe,
    CustomLabelPipe,
    ExtractPipe,
    // directives
    MobilePhoneDirective,
    MenuDirective

  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SelectDropDownModule,
    // AgmJsMarkerClustererModule,
    // AgmDirectionModule,
    NgxMaterialTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPermissionsModule.forRoot()

  ],
  exports: [
    //components
    MultiSelectComponent,
    BasketCardItemComponent,
    HeaderComponent,
    FooterComponent,
    SpinButtonComponent,
    FormItemComponent,
    SelectComponent,
    ValidationErrorComponent,
    FileUploaderComponent,
    DatePickerComponent,
    MenuComponent,
    TimePickerComponent,
    NotificationComponent,
    //modules
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    // AgmCoreModule,
    NgxPermissionsModule,
    NgxMaterialTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule,
    //pipes
    PizzaFilterPipe,
    ExtractPipe,
    //directives
    MobilePhoneDirective,
    MenuDirective,
  ]

})
export class SharedModule { }
