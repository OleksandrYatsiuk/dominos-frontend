import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface FileOptions {
  src: string | ArrayBuffer,
  file: FormData
}
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})

export class FileUploaderComponent implements OnInit {
  private imagePath = '../../../../assets/data/undefined_image.jpg';

  @Input() src: FileOptions['src'] | null;
  @Output() upload = new EventEmitter<FileOptions>();

  constructor() { }

  public ngOnInit(): void {
    this.src ? this.src : this.src = this.imagePath;
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.parseFile(event.target.files[0])

      this.upload.emit(
        {
          file: this.appendFile(event.target.files[0]),
          src: this.src
        });
    }
  }

  private appendFile(file: File): FormData {
    const fd: FormData = new FormData();
    fd.append('file', file, file.name);
    return fd;
  }

  private parseFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => this.src = reader.result;
  }
}
