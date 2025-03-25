import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class SpinButtonComponent {
  name = input<string>();
  icon = input<string>('icon icon-check');
  loading = input<boolean>(false);
  class = input('btn btn-primary');
  type = input<'submit' | 'button'>('submit');

  buttonClass = computed(() => ({
    loading: this.loading(),
    [this.class()]: this.class(),
  }))

  onClick = output<Event>();
}
