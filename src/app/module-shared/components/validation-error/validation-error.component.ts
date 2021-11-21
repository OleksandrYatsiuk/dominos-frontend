import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorList } from 'src/app/core/models/error-list';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
  @Input() control: AbstractControl;
  @Input() field = 'Field';
  @Input() otherField = 'Other field';
  public list = ErrorList;

  constructor() { }

}
