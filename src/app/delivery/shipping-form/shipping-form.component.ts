import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { DeliveryDataService } from '../delivery-data.service';
import { Router } from '@angular/router';
import { Payments } from './payments.model';
import { ApiConfigService } from 'src/app/core/services/api-config.service';

@Component({
	selector: 'app-shipping-form',
	templateUrl: './shipping-form.component.html',
	styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
	
	constructor(
		private formBuilder: FormBuilder,
		private notification: NotificationService,
		private user: UserService,
		private http: DeliveryDataService,
		private router: Router,
		private basketService: BasketService,
		private configService: ApiConfigService
	) { }

	public paymentTypes: Payments[] = this.configService.getStatuses('payment');
	public formDelivery: FormGroup;
	public spinShipping = false;
	public totalAmount: string;
	public pizzasIds:string[] = [];

	ngOnInit(): void {
		this.basketService.basket.subscribe(data => this.totalAmount = data.amount)
		this.pizzasIds = this.basketService._storage.map(el => el.id)
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
			amount: [this.totalAmount, [Validators.required]]
		});
	}

	public createDelivery(): void {
		this.formDelivery.markAllAsTouched();
		if (this.formDelivery.valid) {
			this.spinShipping = true;
			this.http.create(this.formDelivery.value).subscribe((res) => {
				this.spinShipping = false;
				this.router.navigate(['/']);
				localStorage.removeItem('basket');
				this.notification.showSuccess('Your order has been accepted!');
			});
		}
	}
}
