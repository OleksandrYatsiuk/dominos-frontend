import { Component, Input, forwardRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]

})
export class DatePickerComponent implements ControlValueAccessor {
  public value: Date;
  public onChange: any = () => { };
  public onTouch: any = () => { };
  public model: NgbDateStruct
  public opened = false;
  @Input() date: string;
  @Input() minDate: string | NgbDateStruct = this.calendar.getToday();
  @Input() maxDate: string | NgbDateStruct = this.calendar.getToday();

  constructor(private calendar: NgbCalendar) { }

  public writeValue(value: any): void {
    this.value = value;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public change(value: NgbDateStruct | InputEvent): void {
    if (value instanceof InputEvent) {
      value.target['value'].length > 0 ? true : this.onChange(null);
    } else {
      this.value = new Date(value.year, --value.month, value.day)
      this.onChange(new Date(value.year, --value.month, value.day));
    }
  }
}
