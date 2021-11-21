import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { DeliveryDataService } from '../../delivery-data.service';
import { Router } from '@angular/router';
import { Payments } from '../shipping-form/payments.model';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapComponent } from '../map/map.component';
import { IShop } from '@core/models/shop.interface';
import { ShopService } from '@core/services/shop.service';
import { Observable, pluck } from 'rxjs';


@Component({
  selector: 'app-carryout',
  templateUrl: './carryout.component.html',
  styleUrls: ['./carryout.component.scss']
})

export class CarryoutComponent implements OnInit, OnDestroy {
  public carryOut: FormGroup;
  public loading = false;
  public shopId = false;
  public totalAmount: string;
  public pizzasIds: string[] = [];
  public paymentTypes: Payments[] = this.configService.getStatuses('payment');
  shops$: Observable<IShop[]>;

  private _ref: DynamicDialogRef;

  constructor(
    private formBuilder: FormBuilder,
    private handler: ErrorHandlerService,
    private userService: UserService,
    private _ms: MessageService,
    private rest: DeliveryDataService,
    private router: Router,
    private configService: ApiConfigService,
    private _ds: DialogService,
    private _ss: ShopService
  ) {
  }

  ngOnDestroy(): void {
    if (this._ref) {
      this._ref.destroy();
    }
  }
  ngOnInit() {

    this.shops$ = this._ss.queryShopsList();

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

  sendPayment(amount: string) {
    this.rest.createPayment({
      amount: +amount,
      order_id: Date.now().toString(),
      description: 'Order #' + Date.now().toString()
    }).subscribe(response=>{
      let link = `https://www.liqpay.ua/api/3/checkout?data=${response.data}&signature=${response.signature}`
      window.open(link, '_blank');
    })
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

  openMap(shops: IShop[]): void {
    this.carryOut.controls.shopId.markAsUntouched({ onlySelf: true });
    this._ref = this._ds.open(MapComponent, {
      dismissableMask: true, showHeader: false, width: '100%', height: '100%', styleClass: 'd-dialog',
      data: { shops },
      baseZIndex: 10000,
    });
    this._ref.onClose.subscribe((shop: IShop) => {
      if (shop) {
        this.carryOut.controls.shopId.setValue(shop.id);
      }
    });
  }


  onSubmit() {
    this.carryOut.markAllAsTouched();
    if (this.carryOut.valid) {
      this.loading = !this.loading;
      this.rest.create(this.carryOut.value)
        .subscribe(res => {
          this.loading = !this.loading;
          this.router.navigate(['/']);
          this._ms.add({ severity: 'success', detail: 'Your order has been accepted!' });
        }, (e) => {
          this.loading = !this.loading;
          this.handler.validation(e, this.carryOut);
        })
    }
  }

  get minDate(): Date {
    return new Date();
  }

}
