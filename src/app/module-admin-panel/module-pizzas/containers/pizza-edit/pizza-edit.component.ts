import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, mergeMap } from 'rxjs/operators';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { EMPTY, Observable } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { Select, Store } from '@ngxs/store';
import { GetPizzaItem, UpdatePizza } from '../../pizzas/pizzas.actions';
import { PizzasState } from '../../pizzas/pizzas.state';

@Component({
	selector: 'app-pizza-edit',
	templateUrl: './pizza-edit.component.html',
	styleUrls: ['./pizza-edit.component.scss'],
	providers: [LangPipe],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaEditComponent implements OnInit {
	@Select(PizzasState.pizza) pizza$: Observable<Pizza>;
	loading = false;


	constructor(
		private _ar: ActivatedRoute,
		private _ms: MessageService,
		private _lang: LangPipe,
		private _cd: ChangeDetectorRef,
		private _store: Store
	) {
	}


	ngOnInit(): void {
		this._ar.params.pipe(mergeMap(params => this._store.dispatch(new GetPizzaItem(params.id)))).subscribe();
	}

	onSubmit(pizza: Pizza): void {
		this.loading = !this.loading;

		this._store.dispatch(new UpdatePizza(pizza))
			.pipe(
				catchError(e => {
					this.loading = false;
					this._cd.detectChanges();
					return EMPTY;
				}))
			.subscribe(() => {
				this.loading = !this.loading;
				this._ms.add({ severity: 'success', detail: `Pizza '${this._lang.transform(pizza.name)}' has been successfully updated!` });
				this._cd.detectChanges();
			});
	}
}
