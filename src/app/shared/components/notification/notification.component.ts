import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent {

  public status: boolean = true;
  public message;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private notification: NotificationService
  ) {
    if (typeof (data) !== 'string') {
      this.message = data.message;
      this.status = data.status;
    } else {
      this.message = data
    }
  }

  close() {
    this.notification.close();
  }
}
