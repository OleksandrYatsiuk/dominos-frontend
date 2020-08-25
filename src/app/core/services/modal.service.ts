import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: NgbModal) { }

  private open(content: any, options?: NgbModalOptions): NgbModalRef {
    return this.modal.open(content, options);
  }

  public openDeleteModal(body: string): NgbModalRef {
    const modal = this.open(DeleteModalComponent, { centered: true });
    modal.componentInstance.data = body;
    return modal;
  }

  public openLoginModal(): NgbModalRef {
    return this.open(LoginComponent, { centered: true, ariaLabelledBy: 'modal-basic-title' })
  }
  public openMapModal(): NgbModalRef {
    return this.open(MapComponent, {  scrollable: true, size: 'lg' })
  }
}
