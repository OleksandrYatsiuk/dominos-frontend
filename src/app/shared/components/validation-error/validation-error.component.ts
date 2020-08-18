import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorList } from 'src/app/core/models/error-list';

@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() field = 'Field';
  @Input() otherField = 'Other field';
  public list = ErrorList;

  constructor() { }

  ngOnInit(): void {
  }

}
