import {
  Component, ChangeDetectionStrategy, forwardRef, ViewEncapsulation,
  AfterContentInit, OnDestroy, input, viewChild, model, effect, signal, computed
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ELanguage } from '@core/models/language';
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { LangChangerComponent } from '../lang-changer/lang-changer.component';
import { ModeChangerComponent } from '../mode-changer/mode-changer.component';

export type EWidgetMode = 'input' | 'textarea' | 'vcvic';

@Component({
  selector: 'd-multi-language-field',
  templateUrl: './multi-language-field.component.html',
  styleUrls: ['./multi-language-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiLanguageFieldComponent),
    multi: true
  }],
  imports: [FormsModule, AngularEditorModule, LangChangerComponent, ModeChangerComponent],

})
export class MultiLanguageFieldComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
  type = model<EWidgetMode>('input');

  key = model<ELanguage | string>(ELanguage.uk);

  disabled = model<boolean>(false);

  placeholder = input<string | null>(null);

  showLang = input(true);
  showMode = input(false);
  styleClass = input<string | null>(null);

  value = signal<object>({ uk: '', en: '' });

  keys = computed(() => this.value() ? Object.keys(this.value()) : []);

  text = computed<string>(() => this.value() ? this.value()[this.key()] : '');

  angularEditor = viewChild(AngularEditorComponent);

  constructor() {
    effect(() => {
      this._decodeCyrillic(this.textarea);
    })
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false
  }

  ngOnDestroy(): void {
    this.textarea?.removeEventListener('focusout', () => { });
  }

  ngAfterContentInit(): void {
    this.textarea?.addEventListener('focusout', (ev) => this._decodeCyrillic(this.textarea));
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(v: object): void {
    this.value.set(v);
    if (typeof v === 'object' && v !== null) {
      this.key.set(Object.keys(v)[0]);
    } else {
      this.key.set(ELanguage.uk);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  eventChange(value: string): void {
    this.value.update((v) => ({ ...v, ...{ [this.key()]: value } }));
    this.onChange(this.value());
    this.onTouched(this.value());
  }

  private _decodeCyrillic(textarea: HTMLDivElement): void {
    if (textarea) {
      this.eventChange(textarea.innerHTML);
      this.onChange(this.value());
    }
  }

  get textarea(): HTMLDivElement {
    return this.angularEditor()?.textArea?.nativeElement as HTMLDivElement;
  }
}
