import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private _cs: ConfirmationService) { }

  confirm(confirmation?: Confirmation): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this._cs.confirm({
        key: 'warning',
        message: "Are you agree?",
        acceptButtonStyleClass: 'btn btn--yellow',
        rejectButtonStyleClass: 'btn btn--gray',
        acceptLabel: "Confirm",
        rejectLabel: "Cancel",
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
        message: 'Are you want to delete?',
        rejectButtonStyleClass: 'btn btn--gray',
        acceptButtonStyleClass: 'btn btn--red',
        key: 'dangerous',
        rejectLabel: "Cancel",
        acceptLabel: "Delete",
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

