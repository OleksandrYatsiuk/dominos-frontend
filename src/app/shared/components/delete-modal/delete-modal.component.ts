import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Input() data: string;
  public loading: boolean;
  constructor(
    private modal: NgbActiveModal
  ) { }

  public close(): void {
    this.modal.dismiss(false);
  }

  public delete(): void {
    this.modal.close(true);
  }
}




