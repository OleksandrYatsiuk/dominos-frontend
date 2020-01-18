import { Component, OnInit, Input } from '@angular/core';
import { RootService } from '../../../shared/root.service';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent {
  @Input() item;
}
