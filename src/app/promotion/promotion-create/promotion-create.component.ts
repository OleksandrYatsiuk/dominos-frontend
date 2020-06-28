import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionDataService } from '../promotion-data.service';
import { pluck } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { NotificationService } from 'src/app/core/services/notification.service';

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
      title: [null, [Validators.required, Validators.minLength(10)]],
      content: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      image: [null, [Validators.required]],
    });

  }
  public create() {
    this.createPromotionForm.markAllAsTouched();
    if (this.createPromotionForm.valid) {
      this.loading = !this.loading;
      const { title, content, image } = this.createPromotionForm.value
      this.http.create({
        title,
        content,
        image: 'https://media.dominos.ua/__sized__/promotions/promotions_image/2020/04/02/woweekend_news_ukr-crop-c0-5__0-5-2300x1352-70.jpg'
      })
        .pipe(pluck('result'))
        .subscribe(result => {
          this.loading = !this.loading;
          this.notification.open({
            data: `Акція "${result.title}" успішно збережена!`
          })
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
