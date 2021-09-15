import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation, ChangeDetectorRef, ViewChild, TemplateRef, Renderer2, AfterContentInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ELanguage, ILanguage } from '@core/models/language';
import { AngularEditorComponent } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';

export type EWidgetMode = 'input' | 'textarea' | 'vcvic';

@Component({
  selector: 'd-multi-language-field',
  templateUrl: './multi-language-field.component.html',
  styleUrls: ['./multi-language-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiLanguageFieldComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class MultiLanguageFieldComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
  @Input() set type(t: EWidgetMode) {
    this._type = t;
    this._decodeCyrillic(this.textarea);
  };
  get type(): EWidgetMode {
    return this._type;
  }
  @Input() key: string = ELanguage.uk;
  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() showLang = true;
  @Input() showMode = false;
  @Input() styleClass: string;
  @ViewChild('angularEditor') angularEditor: AngularEditorComponent;
  private _value: object = { uk: '', ru: '', en: '', };
  private _type: EWidgetMode = 'input';
  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false
  }
  constructor(
    private _cd: ChangeDetectorRef) { }


  ngOnDestroy(): void {
    this.textarea?.removeEventListener('focusout', () => { });
  }


  ngAfterContentInit(): void {
    this.textarea?.addEventListener('focusout', (ev) => this._decodeCyrillic(this.textarea));
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(v: object): void {
    this._value = v;
    if (typeof v === 'object' && v !== null) {
      this.key = Object.keys(v)[0];
    } else {
      this.key = ELanguage.uk;
    }
    this._cd.detectChanges();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  eventChange(v: string): void {
    this.value = { ...this.value, ...{ [this.key]: v } };
  }

  get value(): object {
    return this._value ? this._value : { uk: '', ru: '', en: '' }
  }

  set value(v: object) {
    this.onChange(v);
    this.onTouched(v);
    this._value = v;
  }

  private _decodeCyrillic(textarea: HTMLDivElement): void {
    if (textarea) {
      this.eventChange(textarea.innerHTML);
      this.onChange(this.value);

    }

  }

  get textarea(): HTMLDivElement {
    return this.angularEditor?.textArea?.nativeElement as HTMLDivElement;
  }


}
