import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: string[];
  @Input() placeholder = 'Select Item';
  @Input() trackBy = 'label';
  @Input() return = 'value';
  public value: string;
  public isDisabled: boolean;

  private onChange;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value.length > 0) {
      this.value = value;
    }
  }

  selectItem(item): void {
    this.onChange(item[this.return]);
    this.value = item[this.trackBy];
  }
  public clear() {
    this.onChange(null);
    this.value = '';
  }

}
