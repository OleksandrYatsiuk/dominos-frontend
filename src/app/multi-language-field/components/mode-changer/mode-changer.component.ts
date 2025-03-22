import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-mode-changer',
    templateUrl: './mode-changer.component.html',
    styleUrls: ['./mode-changer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ModeChangerComponent implements OnInit {
  @Input() type: string;
  @Output() typeChange = new EventEmitter<string>()
  options: { type: string; }[];

  constructor() { }

  ngOnInit(): void {

    this.options = [
      { type: 'input' },
      { type: 'textarea' },
      { type: 'vcvic' }
    ];
  }

  onSelect(type: string): void {
    this.typeChange.emit(type)
  }

}
