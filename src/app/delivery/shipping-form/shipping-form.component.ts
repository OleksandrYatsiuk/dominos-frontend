import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {


  @Output() displayError: boolean;
  formDelivery: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formDelivery = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      phone: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ["", [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: ["", [Validators.required]],
        house: ["", [Validators.required]],
        flat: ["", []],
        entrance: ["", []],
        code: ["", []],
        floor: ["", []],
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

  validateAllFormFields(formDelivery: FormGroup) {
    Object.keys(formDelivery.controls).forEach(field => {
      const control = formDelivery.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.formDelivery.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.formDelivery); //{7}
    }
  }

}
