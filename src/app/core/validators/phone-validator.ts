import { ValidatorFn, FormControl } from '@angular/forms';

export function phoneValidator(regex: string): ValidatorFn {
    return (control: FormControl) => {
        const value = control.value;

        if (value == null || value === '') {
            return null;
        }

        if (!new RegExp(regex).test(value)) {
            return { phoneNumber: true };
        }

        return null;
    };

}