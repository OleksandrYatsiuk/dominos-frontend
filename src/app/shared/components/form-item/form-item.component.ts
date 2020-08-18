import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  constructor() { }
  @Input() control: FormControl;
  @Input() field = 'Field';
  @Input() otherField = "Other Field";

  ngOnInit() {

  }

}
