import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class SpinButtonComponent {
  name = input<string>();
  loading = input<boolean>(false);
  class = input('btn btn-primary');
  type = input<'submit' | 'button'>('submit');
}
