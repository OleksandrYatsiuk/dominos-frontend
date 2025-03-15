import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLanguageFieldComponent } from './components/multi-language-field/multi-language-field.component';
import { ModeChangerComponent } from './components/mode-changer/mode-changer.component';
import { LangChangerComponent } from './components/lang-changer/lang-changer.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({ declarations: [
        MultiLanguageFieldComponent,
        ModeChangerComponent,
        LangChangerComponent
    ],
    exports: [MultiLanguageFieldComponent], imports: [CommonModule,
        FormsModule,
        AngularEditorModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class MultiLanguageFieldModule { }
