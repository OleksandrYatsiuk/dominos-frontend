import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface FileOptions {
  src?: string | ArrayBuffer;
  file: Files;
}

type Files = File | File[];

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploaderComponent),
    multi: true
  }]
})

export class FileUploaderComponent implements ControlValueAccessor {
  public imagePath = '../../../../assets/data/default_image.png';
  public value: Files
  public onChange = (v: Files | null): void => { };
  public onTouch: any = () => { };
  @Input() src: FileOptions['src'] | null;
  @Output() upload = new EventEmitter<FileOptions>();

  constructor() {
  }

  writeValue(file: Files): void {
    if (typeof file == 'string') {
      this.src = file
    } else {
      this.onChange(file);
      this.value = file;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public onFileSelected(event: any): void {

    if (event.target.files && event.target.files[0]) {
      this.parseFile(event);
      this.writeValue(event.target.files[0])
      this.upload.emit(
        {
          file: event.target.files[0]
        })
    }
  }

  private parseFile(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.src = reader.result;
      }
    }
  }
}

