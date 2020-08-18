import { Component, OnInit } from '@angular/core';
import { BasketService } from '../core/services/basket.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
	public totalAmount: string;
	public pizzas;

	get items() {
		return this.basketService.storage;
	}
	constructor(private title: Title,
		private basketService: BasketService,
		private router: Router) {
	}

	ngOnInit(): void {
		this.basketService.basket.subscribe(cnt => {
			if (this.router.url.includes('delivery')) {
				cnt.count > 0 ? this.totalAmount = cnt.amount : this.router.navigateByUrl('/')
			}
		});
		this.title.setTitle('Доставка');
		this.items;
	}
}
