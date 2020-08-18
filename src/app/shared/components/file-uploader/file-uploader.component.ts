import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  selectedFile: any;
  imagePath: any;
  @Input() src: any;
  @Output() upload: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.src);
    if (!this.src) {
      this.src = '../../../../assets/data/undefined_image.jpg'
    }
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => this.src = reader.result;
    }

    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.upload.emit({ file: fd, src: this.src });
    }
  }
}
