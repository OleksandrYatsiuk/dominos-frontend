import { Component, Input, Output } from "@angular/core";
import { BasketService, PizzaItem } from "../../../core/services/basket.service";

@Component({
  selector: "app-basket-card-item",
  templateUrl: "./basket-card-item.component.html",
  styleUrls: ["./basket-card-item.component.scss"]
})
export class BasketCardItemComponent {
  @Input() item;
  @Output() count;

  constructor(
    private basketService: BasketService,
  ) {
  }

  addToCard(item: PizzaItem) {
    this.basketService.add({ id: item.id, type: item.type, price: item.price });
  }

  removeFromCard(item: PizzaItem) {
    this.basketService.remove(item);
  }
}
