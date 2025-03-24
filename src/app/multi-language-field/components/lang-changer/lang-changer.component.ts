import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';

@Component({
  selector: 'app-lang-changer',
  templateUrl: './lang-changer.component.html',
  styleUrls: ['./lang-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  standalone: true,
})
export class LangChangerComponent {
  keys = input<string[]>([]);

  key = model<string>('');

  onSelect(key: string): void {
    this.key.set(key);
  }
}
