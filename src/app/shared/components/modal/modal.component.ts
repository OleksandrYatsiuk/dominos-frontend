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
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: DeliveryDataService,
    private notification: NotificationService) { }
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public delete() {
    this.http.delete(this.data.delivery.id).subscribe(response => {
      this.notification.open({ data: "Замовленя видалено успішно!" })
      this.dialogRef.close();
    }, (err) => {
      this.notification.open({ data: err.message })
    })
  }
}




