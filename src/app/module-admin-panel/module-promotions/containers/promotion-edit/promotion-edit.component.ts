import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { PromotionDataService } from '../../../../core/services/promotion-data.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelPromotion } from '../../../../core/models/promotions/promotions.model';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { PromotionFormComponent } from '../../components/promotion-form/promotion-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe],
  standalone: true,
  imports: [AsyncPipe, PromotionFormComponent]
})
export class PromotionEditComponent implements OnInit {
  form: UntypedFormGroup;
  image = new UntypedFormControl();
  loading = signal(false);
  promotion$: Observable<ModelPromotion>;
  promoStatuses = [];
  constructor(
    private http: PromotionDataService,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _ms: MessageService,
    private _handler: ErrorHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.promotion$ = this._ar.params.pipe(switchMap(params => this.http.getItem(params.id)));
  }

  update(promotion: ModelPromotion): void {
    this.loading.set(true);
    this.http.update(promotion.id, { ...promotion, image: typeof promotion.image === 'string' ? promotion.image : null })
      .pipe(
        concatMap(promo => {
          return promotion.image instanceof File ? this.http.upload(promotion.id, promotion.image) : of(promo);
        }),
        catchError(error => {
          this.loading.set(false);
          this._handler.validation(error, this.form);
          return EMPTY;
        }))
      .subscribe(result => {
        this.loading.set(false);
        this._ms.add({ severity: 'success', detail: `Promotion "${inject(LangPipe).transform(result.name)}" updated successfully!` });
        this._router.navigate(['/admin/promotions']);
      });
  }

}
