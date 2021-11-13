import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Drink } from '@core/models/drink/drink.interface';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinkCardComponent {
  @Input() drink: Drink;
  constructor() { }

}
