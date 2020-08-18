export const ErrorList = [
    { type: 'required', message: 'can not be blank.' },
    { type: 'password', message: 'must contain at least 8 symbols with numbers and letters!' },
    { type: 'minlength', message: 'should contain at least {otherValue} character(s).' },
    { type: 'maxlength', message: 'New Password should contain at most {otherValue} character(s).' },
    { type: 'email', message: 'is not a valid email address.' },
    { type: 'confirmPasswordError', message: 'must be equal to "{otherValue}".' },
    { type: 'phoneNumber', message: '' },
    { type: 'apiValidation', message: '' }
];