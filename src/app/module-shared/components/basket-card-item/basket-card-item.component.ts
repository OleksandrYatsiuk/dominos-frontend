import { Component, Input, Output } from "@angular/core";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-basket-card-item",
  templateUrl: "./basket-card-item.component.html",
  styleUrls: ["./basket-card-item.component.scss"]
})
export class BasketCardItemComponent {
  @Input() item;
  @Output() count;

  constructor(
    private _store: Store,
  ) {
  }

  addToCard(item: any) {
    // this.basketService.add({ id: item.id, type: item.type, price: item.price });
  }

  removeFromCard(item: any) {
    // this.basketService.remove(item);
  }
}
