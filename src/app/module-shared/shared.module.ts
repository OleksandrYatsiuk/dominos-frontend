import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasketCardItemComponent } from './components/basket-card-item/basket-card-item.component';
import { CustomLabelPipe } from './pipe/custom-label.pipe';
import { FormItemComponent } from './components/form-item/form-item.component';
import { ExtractPipe } from './pipe/extract.pipe';
import { MobilePhoneDirective } from './directives/mobile-phone.directive';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MainModule } from '../module-main/main.module';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        // components
        // pipes
        CustomLabelPipe,
        ExtractPipe,
        // directives
        MobilePhoneDirective,
    ],
    exports: [
        //component
        FileUploaderComponent,
        //modules
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        ToastModule,
        MainModule,
        //pipes
        ExtractPipe,
        //directives
        MobilePhoneDirective,
    ],
    imports: [
        FormsModule,
        CommonModule,
        FormItemComponent,
        FileUploaderComponent,
        ReactiveFormsModule,
        DropdownModule,
        SelectButtonModule,
        RouterModule,
        MainModule,
        TranslateModule,
        ToastModule,
        BasketCardItemComponent,
    ],
})
export class SharedModule { }
