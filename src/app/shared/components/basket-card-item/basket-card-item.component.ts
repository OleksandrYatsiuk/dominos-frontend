import { Component, OnInit, Input, Output } from "@angular/core";
import { BasketService, PizzaItem } from "../../../core/services/basket.service";
import { PizzaDataService } from "src/app/products/pizza/pizza-data.service";

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
    this.basketService.add({ id: item.id, name: item.name, size: item.size, price: item.price, image: item.image });
  }

  removeFromCard(item: PizzaItem) {
    this.basketService.remove(item);
  }
}
