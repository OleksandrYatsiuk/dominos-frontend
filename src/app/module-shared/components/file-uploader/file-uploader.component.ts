import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { stubImage } from 'src/utils/stubs';

export interface FileOptions {
  src?: string | ArrayBuffer;
  value?: File;
  isDelete: boolean;
  isUpdate: boolean;
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
  }],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, NgIf, LazyLoadImageModule]
})

export class FileUploaderComponent implements ControlValueAccessor {
  imagePath = stubImage;
  value: Files
  onChanged = (v: Files | null): void => { };
  onTouch: any = () => { };
  @Input() src: FileOptions['src'] | null;
  @Input() width: number;
  @Input() imageStyle: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange = new EventEmitter<FileOptions>();

  constructor(private _cd: ChangeDetectorRef) {
  }

  writeValue(file: Files): void {
    if (typeof file == 'string') {
      this.src = file
    } else {
      this.onChanged(file);
      this.value = file;
    }
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public onFileSelected(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      this.parseFile(event);
      this.writeValue(file)
      this.onChange.emit(
        {
          value: file,
          isUpdate: true,
          isDelete: false
        });
      this._cd.detectChanges();

    }
  }

  private parseFile(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.src = reader.result;
        this._cd.detectChanges();
      }
    }
  }

  onDeleteFile(): void {
    this.value = null;
    this.src = null;
    this.onChange.emit({ value: null, isUpdate: false, isDelete: true })
    this.onChanged(null)
    this._cd.detectChanges();
  }
}

