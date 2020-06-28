import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeliveryDataService } from 'src/app/delivery/delivery-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: DeliveryDataService,
    private notification: NotificationService
  ) { }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public delete() {
    this.dialogRef.close(true);
  }
}




