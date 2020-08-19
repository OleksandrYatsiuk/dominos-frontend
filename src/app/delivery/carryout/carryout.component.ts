import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeliveryDataService } from '../delivery-data.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { Router } from '@angular/router';
import { PaymentTypes, Payments } from '../shipping-form/payments.model';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
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
  public paymentTypes: Payments[] = this.configService.getStatuses('payment');

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
    private notification: NotificationService,
    private rest: DeliveryDataService,
    private basketService: BasketService,
    private router: Router,
    private configService: ApiConfigService
  ) {
  }
  ngOnInit() {

    this.basketService.basket.subscribe(data => this.totalAmount = data.amount)
    this.pizzasIds = this.basketService._storage.map(el => el.id)
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getTime() + (7 * 24 * 3600 * 1000));

    this.initForm();
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.carryOut.patchValue({
          firstName: user.fullName,
          email: user.email,
          phone: user.phone,
        });
      }
    });
  }

  showDate(date) {
    const control = this.carryOut.get('date')['controls'].date as FormControl;
    control.setValue(date);
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
        type: ['', [Validators.required]],
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
    console.log(this.carryOut.value);
    this.carryOut.markAllAsTouched();
    if (this.carryOut.valid) {
      this.loading = true;
      this.carryOut.controls.shopId.setValue(this.shopId);
      this.rest.create(this.carryOut.value).subscribe(res => {
        this.loading = false;
        this.router.navigate(['/']);
        this.basketService.clear();
        this.notification.open({ data: 'Your order has been accepted!' });
      });
    }
  }
}
