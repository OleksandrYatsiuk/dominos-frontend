import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { error } from 'util';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  constructor() { }
  @Input() label: string;
  @Input() placeholder: string;
  @Input() error: any;
  @Input() type = 'text';
  @Input() formControlName;
  @Input() form: FormGroup;
  @Output() controlName = new EventEmitter<string>();
  public isPresent = false;
  hasError = { error: this.isPresent }
  get field() { return this.form.get(this.formControlName) };

  ngOnInit() {
    this.error.forEach(element => {
      if (this.field.hasError(element.type) && this.field.invalid) {
        console.log(element.massage)
      }
    });
  }

  setError() {
    this.error ? this.isPresent = true : this.isPresent = false;
    this.hasError = { error: this.isPresent }
  }
}
