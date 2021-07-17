import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeliveryDataService } from '../delivery-data.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { Router } from '@angular/router';
import { Payments } from '../shipping-form/payments.model';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-carryout',
  templateUrl: './carryout.component.html',
  styleUrls: ['./carryout.component.scss']
})

export class CarryoutComponent implements OnInit {
  public carryOut: FormGroup;
  public loading = false;
  public shopId = false;
  public totalAmount: string;
  public pizzasIds: string[] = [];
  public paymentTypes: Payments[] = this.configService.getStatuses('payment');

  constructor(
    private formBuilder: FormBuilder,
    public modal: ModalService,
    private handler: ErrorHandlerService,
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

  initForm(): void {
    this.carryOut = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      shopId: ['', [Validators.required]],
      comment: ['', []],
      date: this.formBuilder.group({
        date: [new Date(), [Validators.required]],
        time: [new Date(), [Validators.required]],
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
    this.carryOut.controls.shopId.markAsUntouched({ onlySelf: true })
    // this.modal.openMapModal().result
    //   .then(result => {
    //     this.carryOut.controls.shopId.setValue(result.address);
    //     this.shopId = result.id;
    //   }).catch(e => e)
  }


  onSubmit() {
    this.carryOut.markAllAsTouched();
    if (this.carryOut.valid) {
      this.loading = !this.loading;
      const data = Object.assign(this.carryOut.value, { shopId: this.shopId })
      this.rest.create(data)
        .subscribe(res => {
          this.loading = !this.loading;
          this.router.navigate(['/']);
          this.basketService.clear();
          this.notification.showSuccess('Your order has been accepted!');
        }, (e) => {
          this.loading = !this.loading;
          this.handler.validation(e, this.carryOut);
        })
    }
  }
}
