import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
  }]
})
export class TimePickerComponent implements ControlValueAccessor {
  public value: Date;
  public model: NgbTimeStruct;
  public onChange: any = () => { };
  public onTouch: any = () => { };

  constructor(private modalService: NgbModal) { }

  public open(content): void {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title', size: 'sm', centered: true })
      .result
      .then(result => this.parseTime(result))
      .catch(dismiss => this.onChange(new Date()));
  }

  public change(value: Date): void {
    this.onChange(value);
  }

  private parseTime(time: NgbTimeStruct): void {
    time ? this.onChange(this.convertNgbTime(time)) : this.onChange(null);
  }

  private convertNgbTime(time: NgbTimeStruct) {
    const today = new Date;
    today.setHours(time.hour);
    today.setMinutes(time.minute);
    return today;
  }

  private setNgbTime(date: Date): void {
    this.model = {
      minute: moment(date).get('minutes'),
      hour: moment(date).get('hours'),
      second: 0
    };
  }

  public writeValue(value: Date): void {
    this.value = value;
    this.setNgbTime(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
