import { Component, OnInit, Input, Output } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';

@Component({
  selector: 'app-basket-card-item',
  templateUrl: './basket-card-item.component.html',
  styleUrls: ['./basket-card-item.component.scss']
})
export class BasketCardItemComponent implements OnInit {

  @Input() item;
  @Output() count;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    console.log(this.item);
  }

  addToCard(item) {
    item.count = this.basketService.addToLocalStorage(item, item.size, item.price);
    this.count = item.count;
  }

  removeFromCard(item) {
    item.count = this.basketService.deleteItemLocalStorage(item, item.size);
    this.count = item.count;
  }
}
