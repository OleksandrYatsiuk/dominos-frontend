import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private _cs: ConfirmationService, private _ts: TranslateService) { }

  confirm(confirmation?: Confirmation): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this._cs.confirm({
        key: 'warning',
        message: "Are you agree?",
        acceptButtonStyleClass: 'btn btn--yellow',
        rejectButtonStyleClass: 'btn btn--gray',
        acceptLabel: this._ts.instant('confirmLabel'),
        rejectLabel: this._ts.instant('cancelLabel'),
        ...confirmation,
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  delete(confirmation?: Confirmation): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this._cs.confirm({
        dismissableMask: true,
        message: this._ts.instant('messages.delete'),
        rejectButtonStyleClass: 'btn btn--gray',
        acceptButtonStyleClass: 'btn btn--red',
        key: 'dangerous',
        rejectLabel: this._ts.instant('cancelLabel'),
        acceptLabel: this._ts.instant('deleteLabel'),
        ...confirmation,
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}

