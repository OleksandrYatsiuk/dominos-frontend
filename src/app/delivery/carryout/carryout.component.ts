import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-carryout',
  templateUrl: './carryout.component.html',
  styleUrls: ['./carryout.component.scss']
})
export class CarryoutComponent implements OnInit {
  carryOut: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.carryOut = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      phone: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ["", [Validators.required, Validators.email]],
      restaurant: this.formBuilder.group({
        restaurant: ["", [Validators.required]],
        comment: ["", []],
      }),
      date: this.formBuilder.group({
        date: ["", [Validators.required]],
        time: ["", [Validators.required]],
      }),
      payment: this.formBuilder.group({
        coupon: ["", []],
        remainder: ["", []],
        type: ["", [Validators.required]],
      })
    })
  }

}
