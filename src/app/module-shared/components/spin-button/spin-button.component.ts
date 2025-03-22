import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-spin-button',
    templateUrl: './spin-button.component.html',
    styleUrls: ['./spin-button.component.scss'],
    standalone: false
})
export class SpinButtonComponent {

  constructor() { }
  @Input() name: string;
  @Input() loading = false;
  @Input() type = 'submit';
  @Input() class = 'btn btn-primary';
}
