import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss']
})
export class SpinButtonComponent {

  constructor() { }
  @Input() name: string;
  @Input() loading: boolean;
  @Input() color = 'primary';
}
