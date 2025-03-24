import { Component, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelPromotion } from '@core/models/promotions/promotions.model';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploaderComponent } from '@shared/components/file-uploader/file-uploader.component';
import { SpinButtonComponent } from '@shared/components/spin-button/spin-button.component';
import { ValidationErrorComponent } from '@shared/components/validation-error/validation-error.component';
import { DatePickerModule } from 'primeng/datepicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiLanguageFieldComponent } from 'src/app/multi-language-field/components/multi-language-field/multi-language-field.component';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule, ReactiveFormsModule, MultiLanguageFieldComponent, DatePickerModule,
    FileUploaderComponent, InputSwitchModule, ValidationErrorComponent, SpinButtonComponent,
  ],
  standalone: true
})
export class PromotionFormComponent implements OnInit {
  loading = input<boolean>(false);
  promo = input<ModelPromotion>();

  save = output<ModelPromotion>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm(this.promo());
  }

  private initForm(promotion: ModelPromotion): void {
    this.form = this.formBuilder.group({
      id: [promotion?.id, []],
      name: [promotion?.name, [Validators.required]],
      description: [promotion?.description, [Validators.required]],
      isActive: [promotion?.isActive || false, [Validators.required]],
      image: [promotion?.image, []],
      endedAt: [promotion?.endedAt ? new Date(promotion.endedAt) : null, []],
      startedAt: [promotion?.startedAt ? new Date(promotion.startedAt) : null, []],
    });
  }

  onSave(): void {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }

}
