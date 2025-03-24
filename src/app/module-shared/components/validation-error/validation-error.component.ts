import { Component, computed, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorList } from 'src/app/core/models/error-list';

export interface Error {
  type: string;
  message?: string;
}

@Component({
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class ValidationErrorComponent {
  control = input.required<AbstractControl>();

  field = input<string>('Field');

  otherField = input<string>('Other field');

  styleClass = input<string>();

  customErrors = input<Error[]>([], { alias: 'errors' });

  public list = ErrorList;

  defaultErrorTypes = signal<Error[]>([
    { type: 'required' },
    { type: 'minlength' },
    { type: 'maxlength' },
    { type: 'email' },
    { type: 'min' },
    { type: 'max' },
    { type: 'fileExtension' },
    { type: 'fileSize' },
    { type: 'password' },
    { type: 'confirmPasswordError' },
    { type: 'backendErr' },
  ]);

  errors = computed(() => [...this.defaultErrorTypes(), ...this.customErrors()]);

  withError(error: Error): boolean {
    return this.control() && this.control().hasError(error.type) && this.control().invalid
      && (this.control().dirty || this.control().touched)
  }

}
