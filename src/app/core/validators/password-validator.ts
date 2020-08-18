import { FormControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(regex: RegExp): ValidatorFn {
  return (control: FormControl) => {
    const value = control.value;

    if (value == null || value === '') {
      return null;
    }

    if (!new RegExp(regex).test(value)) {
      return { password: true };
    }

    return null;
  };
}
