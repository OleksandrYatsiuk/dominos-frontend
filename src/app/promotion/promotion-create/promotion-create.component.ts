import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionDataService } from '../promotion-data.service';
import { pluck } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PromotionStatuses, Promotion } from './promotions.interface';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.scss']
})
export class PromotionCreateComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  selectedFile: any;
  public file: File;
  imagePath: any;
  url: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private http: PromotionDataService,
    private handler: ErrorHandlerService,
    private notification: NotificationService,
    private config: ApiConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForms();
  }

  public initForms() {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required,
      Validators.maxLength(this.config.getParameter('promoTitleMaxLength'))]],
      description: [null, [Validators.required,
      Validators.maxLength(this.config.getParameter('promoDescriptionMaxLength'))]],
      image: [null, []],
      startedAt: [new Date(), [Validators.required]],
    });
  }

  public create() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = !this.loading;
      this.http.create({ ...this.form.getRawValue() })
        .pipe(pluck('result'))
        .subscribe(result => {
          this.loading = !this.loading;
          this.notification.showSuccess(`Акція "${result.title}" успішно збережена!`);
          this.router.navigateByUrl('/admin/promotions')
        }, (error) => {
          this.loading = false;
          this.handler.validation(error, this.form);
        });
    }
  }
}
