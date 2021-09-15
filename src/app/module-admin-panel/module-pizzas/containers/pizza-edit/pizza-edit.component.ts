import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PizzaDataService } from '../../../../core/services/pizza-data.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { EMPTY, Observable } from 'rxjs';
import { LangPipe } from '@shared/pipe/lang.pipe';

@Component({
	selector: 'app-pizza-edit',
	templateUrl: './pizza-edit.component.html',
	styleUrls: ['./pizza-edit.component.scss'],
	providers: [LangPipe],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaEditComponent implements OnInit {
	pizza$: Observable<Pizza>;
	loading = false;
	constructor(
		private _ar: ActivatedRoute,
		private _ms: MessageService,
		private _pizzaService: PizzaDataService,
		private _lang: LangPipe,
		private _cd: ChangeDetectorRef
	) {
	}


	ngOnInit(): void {
		this.pizza$ = this._ar.params.pipe(mergeMap(params => this._pizzaService.getPizza(params.id)))
	}

	onSubmit(pizza: Pizza): void {
		this.loading = !this.loading;
		this._pizzaService.edit(pizza.id, pizza)
			.pipe(
				catchError(e => {
					this.loading = false;
					return EMPTY;
				}))
			.subscribe(pizza => {
				this.loading = !this.loading;
				this._ms.add({ severity: 'success', detail: `Pizza '${this._lang.transform(pizza.name)}' has been successfully updated!` });
				this._cd.detectChanges();
			});
	}
}
