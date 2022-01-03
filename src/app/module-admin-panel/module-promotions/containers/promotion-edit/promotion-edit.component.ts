import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PromotionDataService } from '../../../../core/services/promotion-data.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelPromotion } from '../../../../core/models/promotions/promotions.model';
import { catchError, concatMap, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe]
})
export class PromotionEditComponent implements OnInit {
  form: FormGroup;
  image = new FormControl();
  loading = false;
  promotion$: Observable<ModelPromotion>;
  promoStatuses = [];
  constructor(
    private http: PromotionDataService,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _ms: MessageService,
    private _handler: ErrorHandlerService,
    private _cd: ChangeDetectorRef,
    private _lang: LangPipe
  ) {
  }

  ngOnInit(): void {
    this.promotion$ = this._ar.params.pipe(switchMap(params => this.http.getItem(params.id)))
  }

  update(promotion: ModelPromotion): void {
    this.loading = !this.loading;
    this.http.update(promotion.id, { ...promotion, image: typeof promotion.image === 'string' ? promotion.image : null })
      .pipe(
        concatMap(promo => {
          return promotion.image instanceof File ? this.http.upload(promotion.id, promotion.image) : of(promo);
        }),
        catchError(error => {
          this.loading = false;
          this._handler.validation(error, this.form);
          return EMPTY;
        }))
      .subscribe(result => {
        this.loading = !this.loading;
        this._ms.add({ severity: 'success', detail: `Promotion "${this._lang.transform(result.name)}" updated successfully!` });
        this._router.navigate(['/admin']);
        this._cd.detectChanges();
      });
  }

}
