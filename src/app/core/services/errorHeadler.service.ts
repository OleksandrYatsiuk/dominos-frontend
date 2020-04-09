import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ValidationResponse, ValidationError } from '../models/response.interfate';
import { HttpStatusCode } from '../models/http-status-code';
import { ValidationMessages } from '../models/error-list';

@Injectable({
  providedIn: 'root'
})
export class ErrorHeadlerService {
  private msg = new BehaviorSubject<any>(null);
  errorMessage = this.msg.asObservable();
  constructor() { }
  public validations = ValidationMessages;
  public hasError(error: object) {
    this.msg.next(error)
  }
  public validation(error: ValidationResponse, form: FormGroup): void {
    if (error && error.code === HttpStatusCode.UnprocessableEntity && Array.isArray(error.result)) {
      error.result.forEach(({ field, message }: ValidationError) => {
        const control = form.get(field);
        if (control) {
          control.setErrors({ apiValidation: message });
          control.markAsDirty();
          this.validations[field].push({ type: 'apiValidation', message: message });
        }
      });

      return;
    }
  }
}
