import { I18nPluralPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorList } from 'src/app/core/models/error-list';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  standalone: true,
  imports: [TranslateModule, I18nPluralPipe]
})
export class ValidationErrorComponent {
  control = input.required<AbstractControl>();
  field = input<string>('Field');
  otherField = input<string>('Other field');
  public list = ErrorList;

  withError = computed(() => this.control().invalid && (this.control().dirty || this.control().touched));

}
