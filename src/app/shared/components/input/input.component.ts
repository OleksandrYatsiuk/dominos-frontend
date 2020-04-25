import { Component, forwardRef, Input, Optional, Host, SkipSelf } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { ValidationMessages } from '../../../core/models/error-list';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroup }],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})


export class InputComponent implements ControlValueAccessor {

  constructor(@Optional() @Host() @SkipSelf() public container: FormGroupDirective) { }

  public validations = ValidationMessages;
  public onTouch: Function;
  public onModelChange: Function;
  public focus: boolean;

  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() value = "";


  get control(): AbstractControl {
    return this.container.control.get(this.formControlName);
  }
  get errorArray() {
    return this.validations[`${this.formControlName}`]
  }


  public writeValue(value: any): void {
    this.value = value
  }
  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }
  public registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  public onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault()
    event.stopPropagation();
    this.control.markAsUntouched();
  }
  public onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault()
    event.stopPropagation();
  }

}
