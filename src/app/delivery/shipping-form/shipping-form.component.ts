import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { DeliveryDataService } from '../delivery-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {
  paymentTypes = [
    { name: "cash" }, { name: "card" }
  ]
  loading = false;

  public get list() {
    let index = [];
    let storage = JSON.parse(localStorage.getItem('basket'))
    for (let idx in storage) {
      for (let item in storage[idx]) {
        index.push(storage[idx][item]);
      }
    }
    return index;
  }
  formDelivery: FormGroup;
  public spinShipping = false;
  minDate: Date;
  maxDate: Date;
  totalAmount: number;
  pizzasIds = [];
  constructor(private formBuilder: FormBuilder,
    private notification: NotificationService,
    private user: UserService,
    private rest: DeliveryDataService,
    private router: Router,
    private basket: BasketService) { }

  ngOnInit() {
    this.totalAmount = this.basket.actualBasket().amount;
    this.list.forEach(el => { this.pizzasIds.push(el.id); })
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime() + (7 * 24 * 3600 * 1000));
    this.initform();

    this.user.currentUser.subscribe(user => {
      if (user) {
        this.formDelivery.patchValue({
          firstName: user.fullName,
          email: user.email,
          phone: user.phone,
        })
      }
    });
  }



  initform() {
    this.formDelivery = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      phone: ["", [Validators.required]],
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
        date: [new Date(), [Validators.required]],
        time: [`${new Date().getHours() + 1}:${new Date().getMinutes()}`, [Validators.required]],
      }),
      payment: this.formBuilder.group({
        coupon: ["", []],
        remainder: ["", []],
        type: [this.paymentTypes[0].name, [Validators.required]],
      }),
      pizzaIds: this.formBuilder.group({
        pizzaIds: [this.pizzasIds, [Validators.required]],
      }),
      amount: [this.totalAmount, [Validators.required]],
    })
  }

  onSubmit() {
    if (this.formDelivery.valid) {
      this.loading = true;
      this.rest.create(this.formDelivery.value).subscribe(res => {
        this.loading = false;
        this.router.navigate(['/']);
        localStorage.removeItem('basket');
        this.notification.open({ data: "Your order has been accepted!" })
      });
    }
  }


}
