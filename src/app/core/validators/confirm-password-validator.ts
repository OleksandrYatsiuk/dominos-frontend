import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator = (targetControlName: string, compareControlName: string): ValidatorFn => {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const targetControl = formGroup.get(targetControlName);
    const value = targetControl.value;
    const compareControl = formGroup.get(compareControlName);
    const confirmationValue = compareControl.value;

    if (!targetControl || !value || !compareControl || !confirmationValue) {
      return null;
    }

    const isInvalid = value !== confirmationValue;

    if (isInvalid) {
      targetControl.setErrors({ ...targetControl.errors, confirmPasswordError: true });
    } else {
      targetControl.setErrors(null);
    }

    return null;
  };
};
