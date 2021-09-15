import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ELanguage } from '@core/models/language';

@Component({
  selector: 'app-lang-changer',
  templateUrl: './lang-changer.component.html',
  styleUrls: ['./lang-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangChangerComponent {
  @Input() set keys(keys: object) {
    this._keys = Object.keys(keys);
  }

  get keys(): string[] {
    return this._keys;
  }

  private _keys = Object.keys(ELanguage);
  @Input() key: string = '';
  @Output() keyChange = new EventEmitter<string>();
  constructor() { }

  onSelect(key: string): void {
    this.key = key;
    this.keyChange.emit(key);
  }
}
