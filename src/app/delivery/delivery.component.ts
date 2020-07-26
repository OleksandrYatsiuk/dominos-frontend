import { Component, OnInit } from '@angular/core';
import { BasketService } from '../core/services/basket.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: [ './delivery.component.scss' ]
})
export class DeliveryComponent implements OnInit {
	public totalAmount = 0;

	public get list() {
		const index = [];
		const storage = JSON.parse(localStorage.getItem('basket'));
		for (const idx in storage) {
			for (const item in storage[idx]) {
				index.push(Object.assign(storage[idx][item], { id: idx, size: Object.keys(storage[idx])[0] }));
			}
		}
		return index;
	}

	constructor(private title: Title, private basketService: BasketService) {
		this.basketService.updateBasketAmount.subscribe((cnt) => (this.totalAmount = cnt));
	}

	ngOnInit(): void {
		this.title.setTitle('Доставка');
		this.totalAmount = this.basketService.actualBasket().amount;
	}
}
