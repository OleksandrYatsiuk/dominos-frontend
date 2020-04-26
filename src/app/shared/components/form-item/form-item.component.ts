import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationMessages } from '../../../core/models/error-list';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  constructor() { }
  public validations = ValidationMessages;
  @Input() control: FormControl ;
  @Input() name: string;
  get errorArray() {
    return this.validations[`${this.name}`];
  }
  ngOnInit() {

  }

}
