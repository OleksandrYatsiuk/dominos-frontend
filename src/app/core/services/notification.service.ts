import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { NgbCalendarIslamicUmalqura } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }
  open<T>(config?: MatSnackBarConfig): void {
    this.snackBar.openFromComponent(NotificationComponent, config)
  }
  close() {
    this.snackBar.dismiss()
  }

}
