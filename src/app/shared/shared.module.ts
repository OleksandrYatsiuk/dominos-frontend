import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { InputComponent } from './components/input/input.component';
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

@NgModule({
  declarations: [
    LoginComponent,
    MobilePhoneDirective,
    HeaderComponent,
    FooterComponent,
    PizzaFilterPipe,
    CustomLabelPipe,
    BasketCardItemComponent,
    MapComponent,
    ModalComponent,
    NotificationComponent,
    SpinButtonComponent,
    InputComponent,
    FormItemComponent,
    MenuDirective,
    ExtractPipe,
    SelectComponent,
    ValidationErrorComponent,
    MultiSelectComponent,
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
    NgxPermissionsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['geometry', 'places'],
      language: 'uk'
    })

  ],
  exports: [
    MultiSelectComponent,
    NgbModule,
    BasketCardItemComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MapComponent,
    AgmCoreModule,
    SpinButtonComponent,
    NgxPermissionsModule,
    InputComponent,
    PizzaFilterPipe,
    FormItemComponent,
    MenuDirective,
    MatTabsModule,
    MatStepperModule,
    ExtractPipe,
    SelectComponent,
    ValidationErrorComponent,
    MobilePhoneDirective
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7 * 1000, verticalPosition: 'top' } }],
  entryComponents: []

})
export class SharedModule { }
