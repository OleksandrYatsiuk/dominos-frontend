import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FetchBasketsProducts } from '@core/basket/basket.actions';
import { BasketItem, BasketState } from '@core/basket/basket.state';
import { ProductsResponse, SearchProductsParams } from '@core/models/products/products.interface';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryComponent implements OnInit {

	@Select(BasketState.products) products$: Observable<ProductsResponse>;
	@Select(BasketState.items) basketItems$: Observable<BasketItem[]>

	@Select(BasketState.generalSumma) totalAmount$: Observable<string>;
	@Select(BasketState.basketItemsIds) basket$: Observable<SearchProductsParams>;

	constructor(
		private title: Title,
		private _store: Store
	) { }

	ngOnInit(): void {
		this.title.setTitle('Доставка');
		this._store.dispatch(new FetchBasketsProducts());
	}
}
