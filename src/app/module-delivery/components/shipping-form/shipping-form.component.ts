import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { DeliveryDataService } from '../../delivery-data.service';
import { Router } from '@angular/router';
import { Payments } from './payments.model';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { BasketState } from '@core/basket/basket.state';
import { Select } from '@ngxs/store';

@Component({
	selector: 'app-shipping-form',
	templateUrl: './shipping-form.component.html',
	styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
	isBrowser: boolean;

	@Select(BasketState.generalSumma) totalAmount$: Observable<string>;


	constructor(
		@Inject(PLATFORM_ID) private _pid: any,
		private formBuilder: FormBuilder,
		private _ms: MessageService,
		private user: UserService,
		private http: DeliveryDataService,
		private router: Router,
		private configService: ApiConfigService
	) {
		this.isBrowser = isPlatformBrowser(_pid);
	}

	public paymentTypes: Payments[] = this.configService.getStatuses('payment');
	public formDelivery: FormGroup;
	public spinShipping = false;
	public totalAmount: string;
	public pizzasIds: string[] = [];

	ngOnInit(): void {
		this.initForm();
		this.updateForm();
	}

	private updateForm(): void {
		this.user.currentUser.subscribe((user) => {
			if (user) {
				this.formDelivery.patchValue({
					firstName: user.fullName,
					email: user.email,
					phone: user.phone
				});
			}
		});
	}

	private initForm(): void {
		this.formDelivery = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			phone: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			address: this.formBuilder.group({
				street: ['', [Validators.required]],
				house: ['', [Validators.required]],
				flat: ['', []],
				entrance: ['', []],
				code: ['', []],
				floor: ['', []],
			}),
			comment: ['', []],
			date: this.formBuilder.group({
				date: [new Date(), [Validators.required]],
				time: [new Date(), [Validators.required]]
			}),
			payment: this.formBuilder.group({
				coupon: ['', []],
				remainder: ['', []],
				type: [this.paymentTypes[0].value, [Validators.required]]
			}),
			pizzaIds: [this.pizzasIds, [Validators.required]],
			amount: ['', [Validators.required]]
		});
	}

	public createDelivery(): void {
		this.formDelivery.markAllAsTouched();
		if (this.formDelivery.valid) {
			this.spinShipping = true;
			this.http.create(this.formDelivery.value).subscribe((res) => {
				this.spinShipping = false;
				this.router.navigate(['/']);
				if (this.isBrowser) {
					localStorage.removeItem('basket');
				}
				this._ms.add({ severity: 'success', detail: 'Your order has been accepted!' });
			});
		}
	}

	get minDate(): Date {
		return new Date();
	}
}
