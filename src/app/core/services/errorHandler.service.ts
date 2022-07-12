import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ValidationResponse, ValidationError } from '../models/response.interface';
import { HttpStatusCode } from '../models/http-status-code';
import { ErrorList } from '../models/error-list';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private msg = new BehaviorSubject<any>(null);
  errorMessage = this.msg.asObservable();
  constructor() { }
  public validations = ErrorList;
  public hasError(error: object) {
    this.msg.next(error);
  }
  public validation(error: ValidationResponse, form: UntypedFormGroup): void {
    if (error && error?.code === HttpStatusCode.UnprocessableEntity && Array.isArray(error.result)) {
      error.result.forEach(({ field, message }: ValidationError) => {
        const control = form.get(field);
        if (control) {
          this.validations.forEach(err => err.type === 'apiValidation' ? err.message = message : "");
          control.markAsDirty();
          control.setErrors({ apiValidation: message });
        }
      });
      return;
    }
  }
}
