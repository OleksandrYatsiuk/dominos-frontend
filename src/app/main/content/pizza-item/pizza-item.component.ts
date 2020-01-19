import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RootService } from '../../../shared/root.service';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent {
  @Input() item;
  constructor(private rootService: RootService) {}
  onClickMe(item) {
    this.rootService.$bashChanges.next(item);
     localStorage.setItem(item.id, JSON.stringify(item));
  }
}
