import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Validator function for validate password
 * Function does not check required value
 */
export function passwordValidator(): ValidatorFn {
  const pattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

  return (control: FormControl) => {
    if (!pattern.test(control.value)) {
      return { password: true };
    }

    return null;
  };
}
