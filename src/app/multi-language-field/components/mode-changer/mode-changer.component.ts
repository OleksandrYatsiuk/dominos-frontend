import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, model, signal } from '@angular/core';

@Component({
  selector: 'app-mode-changer',
  templateUrl: './mode-changer.component.html',
  styleUrls: ['./mode-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  standalone: true,
})
export class ModeChangerComponent {
  type = model<string>();

  options = signal([{ type: 'input' }, { type: 'textarea' }, { type: 'vcvic' }]);

  onSelect(type: string): void {
    this.type.set(type);
  }
}
