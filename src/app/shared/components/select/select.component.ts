import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Payments } from 'src/app/delivery/shipping-form/payments.model';

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
  @Input() items: Payments[];
  @Input() placeholder = 'Select Item';
  @Input() trackBy = 'label';
  @Input() return = 'value';
  public value: string | number;
  public isDisabled: boolean;

  public onChange: any = () => { };
  public onTouch: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value) {
      let item = this.items.find(el => value === el[this.return])
      this.onChange(item[this.return]);
      this.value = item[this.trackBy];
    }
  }

  selectItem(item: any): void {
    this.onChange(item[this.return]);
    this.value = item[this.trackBy];
  }
  public clear(): void {
    this.onChange(null);
    this.value = '';
  }

}
