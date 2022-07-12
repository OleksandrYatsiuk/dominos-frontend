import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { PromotionDataService } from '../../../../core/services/promotion-data.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ModelPromotion } from '@core/models/promotions/promotions.model';
import { catchError, EMPTY } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';
@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe]
})
export class PromotionCreateComponent {
  public form: UntypedFormGroup;
  public loading = false;
  selectedFile: any;
  public file: File;
  imagePath: any;
  url: string | ArrayBuffer;

  constructor(
    private http: PromotionDataService,
    private handler: ErrorHandlerService,
    private _router: Router,
    private _ms: MessageService,
    private _cd: ChangeDetectorRef,
    private _lang: LangPipe
  ) { }


  onSave(promotion: ModelPromotion): void {
    this.loading = !this.loading;
    this.http.create(promotion)
      .pipe(catchError(error => {
        this.loading = false;
        this.handler.validation(error, this.form);
        this._cd.detectChanges();
        return EMPTY;
      }))
      .subscribe(result => {
        this.loading = !this.loading;
        this._ms.add({ severity: 'success', detail: `Акція "${this._lang.transform(result.name)}" успішно збережена!` });
        this._router.navigate(['/admin']);
        this._cd.detectChanges();
      });
  }
}
