import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PizzaFilterPipe } from './pipe/pizza-filter.pipe';
import { HeaderComponent, FooterComponent } from './layout';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { LoginComponent } from '../auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { DeliveryGuard } from '../core/guards/delivery.guard';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { MaterialModule } from './material.module';
import { AgmDirectionModule } from 'agm-direction';
import { environment } from 'src/environments/environment';
import { AppErrorComponent } from './components/app-error/app-error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PizzaFilterPipe,
    BasketCardItemComponent,
    MapComponent,
    AppErrorComponent
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
    AppErrorComponent
  ],
  providers: [DeliveryGuard],
  entryComponents: [LoginComponent]


})
export class SharedModule { }
