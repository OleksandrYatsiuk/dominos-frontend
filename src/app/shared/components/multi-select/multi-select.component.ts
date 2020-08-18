import { Component, OnInit, Input, forwardRef, ViewChild, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray, FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
  }]
})

export class MultiSelectComponent implements ControlValueAccessor {
  @Input() items: any
  @Input() selectedItems: object[];
  @Input() placeholder = 'Select Item';
  @Input() trackBy = 'label';
  @Input() return = 'value';
  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;
  constructor() { }


  public value = [];
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
    if (!this.value.find(el => el === item)) {
      this.value.push(item)
    } else {
      this.value = this.value.filter(el => el.id !== item.id)
    }
    this.onChange(this.extract(this.value));
  }

  public clear(item) {
    this.dropdown.close()
    this.value = this.value.filter(el => el.id !== item.id)
    this.onChange(this.value);
  }

  private extract(arr) {
    return arr.map(el => el[this.return])
  }
}
