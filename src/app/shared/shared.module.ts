import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MaterialModule } from './material.module';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from './components/notification/notification.component';
import { SpinButtonComponent } from './components/spin-button/spin-button.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CustomLabelPipe } from './pipe/custom-label.pipe';
import { FormItemComponent } from './components/form-item/form-item.component';
import { MenuDirective } from './components/menu.directive';
import { ModalComponent } from './components/modal/modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
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

@NgModule({
  declarations: [
    // components
    LoginComponent,
    FileUploaderComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    BasketCardItemComponent,
    MapComponent,
    ModalComponent,
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
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AgmJsMarkerClustererModule,
    MaterialModule,
    AgmDirectionModule,
    MatTabsModule,
    MatStepperModule,
    NgxMaterialTimepickerModule,
    NgxPermissionsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['geometry', 'places'],
      language: 'uk'
    })

  ],
  exports: [
    //components
    MultiSelectComponent,
    BasketCardItemComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    SpinButtonComponent,
    FormItemComponent,
    SelectComponent,
    ValidationErrorComponent,
    FileUploaderComponent,
    DatePickerComponent,
    MenuComponent,
    TimePickerComponent,
    //modules
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    AgmCoreModule,
    NgxPermissionsModule,
    MatTabsModule,
    MatStepperModule,
    NgxMaterialTimepickerModule,
    //pipes
    PizzaFilterPipe,
    ExtractPipe,
    //directives
    MobilePhoneDirective,
    MenuDirective,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7 * 1000, verticalPosition: 'top' } }],

  entryComponents: []

})
export class SharedModule { }
