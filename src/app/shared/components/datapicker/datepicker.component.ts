import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { NgbDateStruct, NgbDate, NgbDatepickerConfig, NgbCalendar, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [NgbInputDatepickerConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnChanges {

  constructor(private config: NgbInputDatepickerConfig, private calendar: NgbCalendar) {
    if (this.min === 'today') {
      config.minDate = this.calendar.getToday()
    }
  }


  @Input() date: string;
  @Input() min = 'today'
  @Output() select = new EventEmitter<string>();
  @Output() input = new EventEmitter<string>();
  model: NgbDateStruct;


  ngOnChanges(changes: SimpleChanges): void {
    const value = changes.date.currentValue
    if (value) {
      this.model = this.convert(value)
    }

  }

  public showData(date: NgbDate): void {
    this.select.emit(this.parseData(date))
  }

  public change(value) {
    value == null ? this.select.emit("") : false;
  }

  private parseData(date: NgbDate, format = 'YYYY-MM-DD'): any {
    return moment(`${date.year}-${date.month}-${date.day}`).format(format);
  }

  private convert(value) {
    let date = moment(value).format('YYYY-MM-DD').split('-')
    return {
      year: parseInt(date[0]),
      month: parseInt(date[1]),
      day: parseInt(date[2])
    }
  }

}
