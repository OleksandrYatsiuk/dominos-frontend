import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../components/modal-conponent/modal.component';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count: number = 0;
  public amount: number = 0;

  constructor(private modalService: NgbModal, private basket: BasketService) {
  }

  ngOnInit() {
    this.basket.updateBasketAmount.subscribe(cnt => this.amount = cnt);
    this.basket.updateBasketCount.subscribe(cnt => this.count = cnt);
  }

  open() {
    this.modalService.open(ModalContentComponent);
  }
}
