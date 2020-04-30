import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, NG_VALIDATORS } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule, } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { LoginComponent } from '../auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { CreatePizzaGuard } from '../core/guards/createPizza.guard';
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



@NgModule({
  declarations: [
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
    NgxPermissionsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['geometry', 'places'],
      language: 'uk'
    })

  ],
  exports: [
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
  ],
  providers: [CreatePizzaGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7 * 1000, verticalPosition: 'top' } }],
  entryComponents: [LoginComponent, NotificationComponent, ModalComponent]

})
export class SharedModule { }
