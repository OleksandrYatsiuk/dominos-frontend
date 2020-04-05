import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

/**
 * Validator function for validate confirm password
 * Function does not check required value
 */
export function confirmPasswordValidator(compared: AbstractControl): ValidatorFn {
  return (control: FormControl) => {

    if (!control.value || !compared.value || compared.value === control.value) {
      return null;
    }

    return { mismatchPassword: true };
  };
}
