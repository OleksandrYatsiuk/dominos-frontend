import { Component, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {


  @Output() displayError: boolean;
  formDelivery: FormGroup;
  public spinShipping = false;
  constructor(private formBuilder: FormBuilder,
    private notification: NotificationService) { }

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


  onSubmit() {
      this.notification.open({
        data: "Form not working yet!"
      })
    if (this.formDelivery.valid) {

      console.log('form submitted');
    }
  }


}
