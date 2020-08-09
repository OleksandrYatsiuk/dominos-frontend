import { FormControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=_-~`'"*(){}[\]<>,.;:\\|?!])(?=\S+$).{8,}/;

  return (control: FormControl) => {
    const value: string = control.value;
    if (value == null || value === '') {
      return null;
    }

    const isValid = pattern.test(value);
    if (!isValid) {
      return { password: true };
    }

    return null;
  };
}
