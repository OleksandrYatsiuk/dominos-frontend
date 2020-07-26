import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeliveryDataService } from '../delivery-data.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { Router } from '@angular/router';
import { PaymentTypes } from '../shipping-form/payments.model';
@Component({
  selector: 'app-carryout',
  templateUrl: './carryout.component.html',
  styleUrls: ['./carryout.component.scss']
})
export class CarryoutComponent implements OnInit {
  carryOut: FormGroup;
  public loading = false;
  public shopId = false;
  minDate: Date;
  maxDate: Date;
  totalAmount: any;
  pizzasIds = [];
  paymentTypes = [ { name: 'Card', value: PaymentTypes.Card }, { name: 'Cash', value: PaymentTypes.Cash } ];

  public get list() {
    const index = [];
    const storage = JSON.parse(localStorage.getItem('basket'));
    for (const idx in storage) {
      this.pizzasIds.push(idx);
      for (const item in storage[idx]) {
        index.push(storage[idx][item]);
      }
    }
    return index;
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private user: UserService,
    private notification: NotificationService,
    private rest: DeliveryDataService,
    private basket: BasketService,
    private router: Router
  ) { }
  ngOnInit() {
    this.totalAmount = this.basket.actualBasket().amount;
    this.list;

    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime() + (7 * 24 * 3600 * 1000));

    this.initForm();
    this.user.setCurrentUser();
    this.user.currentUser.subscribe(user => {
      if (user) {
        this.carryOut.patchValue({
          firstName: user.fullName,
          email: user.email,
          phone: user.phone,
        });
      }
    });
  }

  initForm(): void {
    this.carryOut = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      shopId: ['', [Validators.required]],
      comment: ['', []],
      date: this.formBuilder.group({
        date: [new Date(), [Validators.required]],
        time: [`${new Date().getHours() + 1}:${new Date().getMinutes()}`, [Validators.required]],
      }),
      payment: this.formBuilder.group({
        coupon: ['', []],
        remainder: ['', []],
        type: [this.paymentTypes[0].value, [Validators.required]],
      }),
      pizzaIds: [this.pizzasIds, [Validators.required]],
      amount: [this.totalAmount, [Validators.required]],
    });
  }

  openMap(): void {
    const dialogRef = this.dialog.open(MapComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.carryOut.controls.shopId.setValue(result.address);
        this.shopId = result.id;
      }
    });
  }


  onSubmit() {
    if (this.carryOut.valid) {
      this.loading = true;
      this.carryOut.controls.shopId.setValue(this.shopId);
      this.rest.create(this.carryOut.value).subscribe(res => {
        this.loading = false;
        this.router.navigate(['/']);
        localStorage.removeItem('basket');
        this.notification.open({ data: 'Your order has been accepted!' });
      });
    }
  }
}
