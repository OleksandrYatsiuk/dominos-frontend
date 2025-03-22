import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
  standalone: true,
  imports: [NgClass, ValidationErrorComponent],
})
export class FormItemComponent {
  control = input<UntypedFormControl | null>(null);

  field = input<string>('Field');

  otherField = input<string>('Other Field');

  withError = computed(() => this.control().invalid && (this.control().dirty || this.control().touched));
}
