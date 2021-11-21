import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
	public totalAmount: string;
	public pizzas;

	constructor(private title: Title,
		private _store: Store,
		private router: Router) {
	}

	ngOnInit(): void {
		this.title.setTitle('Доставка');
	}
}
