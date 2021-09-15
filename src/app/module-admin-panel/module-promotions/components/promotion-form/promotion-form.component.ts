import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelPromotion } from '@core/models/promotions/promotions.model';
import { ApiConfigService } from '@core/services/api-config.service';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionFormComponent implements OnInit {
  @Input() loading: boolean;
  @Input() promotion: ModelPromotion;
  @Output() save = new EventEmitter<ModelPromotion>();
  form: FormGroup;
  constructor(private _fb: FormBuilder, private _config: ApiConfigService) { }

  ngOnInit(): void {
    this._initForm(this.promotion);
  }

  private _initForm(promotion: ModelPromotion): void {
    this.form = this._fb.group({
      id: [promotion?.id, []],
      name: [promotion?.name, [Validators.required, Validators.maxLength(this._config.getParameter('promoTitleMaxLength'))]],
      description: [promotion?.description, [Validators.required,
      Validators.maxLength(this._config.getParameter('promoDescriptionMaxLength'))]],
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
