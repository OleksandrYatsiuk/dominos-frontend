import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootService } from 'src/app/core/services/root.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../../../../../core/services/pizza-data.service';
import { map, pluck } from 'rxjs/operators';
import { Pizza } from 'src/app/core/models/pizza.interface';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-pizza-edit',
	templateUrl: './pizza-edit.component.html',
	styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
	pizza: any;
	form: FormGroup;
	uploadImage: FormGroup;
	url: string | ArrayBuffer;
	ingredients$: Observable<SelectItem[]>;
	loading = false;
	categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
	file: FormData;
	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private title: Title,
		private notification: NotificationService,
		private http: PizzaDataService,
		private rest: RootService,
		private handler: ErrorHandlerService
	) {
		this.pizza = this.route.snapshot.data.pizza;
		this.url = this.pizza.image;
	}

	dropdownList = [];
	dropdownSettings = {};

	onSelectAll(items: any) {
	}
	ngOnInit(): void {

		this.ingredients$ = this.rest.getIngredientsList({ page: 1, limit: 20, sort: 'name' })
			.pipe(pluck('result'), map(ingredients => ingredients.map(i => ({ label: i.name, value: i.id }))));

		this.title.setTitle(`Edit - ${this.pizza.name}`);
		this.initForm();
	}

	initForm(): void {
		this.form = this.formBuilder.group({
			name: [this.pizza.name, [Validators.required, Validators.maxLength(15)]],
			category: [this.pizza.category, [Validators.required]],
			weight: this.formBuilder.group({
				small: [this.pizza.weight.small, [Validators.required]],
				middle: [this.pizza.weight.middle, [Validators.required]],
				big: [this.pizza.weight.big, [Validators.required]]
			}),
			price: this.formBuilder.group({
				small: [this.pizza.price.small, [Validators.required]],
				middle: [this.pizza.price.middle, [Validators.required]],
				big: [this.pizza.price.big, [Validators.required]]
			}),
			ingredients: [this.pizza.ingredients.map(i => i.id), Validators.required],
			image: [null, []]
		});
	}

	onSubmit() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.loading = !this.loading;

			const params: Pizza = {
				...this.form.getRawValue(),
				weight: this.form.get('weight').value,
				price: this.form.get('price').value
			};
			return this.http.edit(this.pizza.id, params)
				.subscribe(pizza => {
					this.loading = !this.loading;
					this.notification.showSuccess(`Pizza '${pizza.name}' has been successfully updated!`);
				},
					(error) => {
						this.loading = !this.loading;
						this.handler.validation(error, this.uploadImage);
					}
				);
		}
	}
}
