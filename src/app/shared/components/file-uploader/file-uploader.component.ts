import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface FileOptions {
  src: string | ArrayBuffer,
  file: File | FormData;
}
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
  public imagePath = '../../../../assets/data/undefined_image.jpg';
  public value: string | File | ArrayBuffer;
  public onChange: any = () => { };
  public onTouch: any = () => { };
  @Input() src: FileOptions['src'] | null;
  @Output() upload = new EventEmitter<FileOptions>();

  constructor() {
  }

  writeValue(file: string | ArrayBuffer): void {
    this.value = file;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public onFileSelected(event: any): void {

    if (event.target.files && event.target.files[0]) {
      this.parseFile(event)
      this.upload.emit(
        {
          file: this.appendFile(event.target.files[0]),
          src: this.src
        });
    }
  }

  private parseFile(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.src = reader.result;
        this.writeValue(reader.result);
        this.onChange(reader.result)
      }
    }
  }

  private appendFile(file: File): FormData {
    const fd: FormData = new FormData();
    fd.append('file', file, file.name);
    return fd;
  }
}

