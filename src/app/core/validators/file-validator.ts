import { ValidatorFn, AbstractControl } from '@angular/forms';

interface FileValidatorOptions {
  regExp: RegExp;
  maxSize?: number;
  expected: {
    size?: string;
    extension?: string;
  };
}

export function csvValidator(): ValidatorFn {
  const regExp = /\.csv/i;
  const expected = { extension: '.csv' };

  return fileValidator({ regExp, expected });
}

export function imageValidator(maxSizeInMb: number = 2): ValidatorFn {
  const regExp = /\.png|jpg|jpeg/i;
  const maxSize = maxSizeInMb * 1024 * 1024;
  const expected = { size: `${maxSizeInMb}MB`, extension: '.jpeg, .png' };

  return fileValidator({ regExp, maxSize, expected });
}

export function fileValidator({ regExp, maxSize, expected }: FileValidatorOptions): ValidatorFn {
  return (control: AbstractControl) => {
    const file: File = control.value;

    if (!file) {
      return;
    }
    const sizeError = { fileSize: { expected: expected.size, fileName: file.name } };
    const extensionError = { fileExtension: { expected: expected.extension } };

    const size = maxSize && file.size > maxSize ? sizeError : null;
    const extension = file.name.search(regExp) === -1 ? extensionError : null;

    return size || extension ? { ...size, ...extension } : null;
  };
}
