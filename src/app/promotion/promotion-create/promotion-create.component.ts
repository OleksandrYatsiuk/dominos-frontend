import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionDataService } from '../promotion-data.service';
import { pluck } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PromotionStatuses } from './promotions.interface';
@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.scss']
})
export class PromotionCreateComponent implements OnInit {
  public createPromotionForm: FormGroup;
  public loading = false;
  selectedFile: any;
  imagePath: any;
  url: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private http: PromotionDataService,
    private handler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.initForms();
  }

  public initForms() {
    this.createPromotionForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required, Validators.maxLength(2000)]],
      image: ["", [Validators.required]],
      startedAt: ["", [Validators.required]],
    });

  }
  public create() {
    this.createPromotionForm.markAllAsTouched();
    if (this.createPromotionForm.valid) {
      this.loading = !this.loading;
      this.http.create(this.createPromotionForm.value)
        .pipe(pluck('result'))
        .subscribe(result => {
          if (this.selectedFile !== null) {
            const fd = new FormData();
            fd.append('file', this.selectedFile, this.selectedFile.name);
            this.http.upload(result.id, fd).subscribe(({ result }) => {
              this.loading = !this.loading;
              this.notification.open({
                data: `Акція "${result.title}" успішно збережена!`
              })
            });
          }
        }, (error) => {
          this.loading = false;
          this.handler.validation(error, this.createPromotionForm);
        });
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }
}
