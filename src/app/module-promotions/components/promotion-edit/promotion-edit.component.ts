import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionDataService } from '../../../core/services/promotion-data.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelPromotion, Promotion } from '../promotion-create/promotions.interface';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public promotion: ModelPromotion = this.route.snapshot.data.promotion;
  public promoStatuses = this.config.getStatuses('promotionStatuses')
  constructor(
    private formBuilder: FormBuilder,
    private http: PromotionDataService,
    private handler: ErrorHandlerService,
    private notification: NotificationService,
    private config: ApiConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  public initForms(): void {
    this.form = this.formBuilder.group({
      title: [this.promotion.title, [Validators.required, Validators.maxLength(this.config.getParameter('promoTitleMaxLength'))]],
      description: [this.promotion.description, [Validators.required,
      Validators.maxLength(this.config.getParameter('promoDescriptionMaxLength'))]],
      status: [this.promotion.status, [Validators.required]],
      image: [null, []],
      endedAt: [this.promotion.endedAt ? new Date(this.promotion.endedAt) : null, []],
      startedAt: [this.promotion.startedAt ? new Date(this.promotion.startedAt) : null, [Validators.required]],
    });
  }

  public update(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = !this.loading;
      this.http.update(this.promotion.id, { ...this.form.getRawValue() })
        .pipe(pluck('result'))
        .subscribe(result => {
          this.loading = !this.loading;
          this.notification.showSuccess(`Promotion "${result.title}" updated successfully!`);
          this.router.navigateByUrl('/promotions')
        }, (error) => {
          this.loading = false;
          this.handler.validation(error, this.form);
        });
    }
  }

}
