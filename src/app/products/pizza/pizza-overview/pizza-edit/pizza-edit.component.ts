import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootService } from 'src/app/core/services/root.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../../pizza-data.service';
import { pluck } from 'rxjs/operators';
import { fileValidator, imageValidator } from 'src/app/core/validators/file-validator';

@Component({
	selector: 'app-pizza-edit',
	templateUrl: './pizza-edit.component.html',
	styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
	pizza: any;
	pizzaForm: FormGroup;
	uploadImage: FormGroup;
	url: string | ArrayBuffer;
	ingredients: [] = [];
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
	selectedItems = [];
	dropdownSettings = {};

	onSelectAll(items: any) {
	}
	ngOnInit(): void {
		this.selectedItems = this.pizza.ingredients

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			allowSearchFilter: false
		};

		this.rest.getIngredientsList({ params: { page: 1, limit: 20, sort: 'name' } })
			.pipe(pluck('result'))
			.subscribe(result => this.ingredients = result);

		this.title.setTitle(`Edit - ${this.pizza.name}`);
		this.initForm();
	}

	initForm() {
		this.uploadImage = this.formBuilder.group({
			file: [this.pizza.image]
		});
		this.pizzaForm = this.formBuilder.group({
			name: [this.pizza.name, [Validators.required, Validators.maxLength(15)]],
			category: [this.pizza.category, [Validators.required]],
			ingredients: [this.pizza.ingredients, Validators.required],
			weight: this.formBuilder.group({
				small: [this.pizza.weight.small, [Validators.required]],
				middle: [this.pizza.weight.middle, [Validators.required]],
				big: [this.pizza.weight.big, [Validators.required]]
			}),
			price: this.formBuilder.group({
				small: [this.pizza.price.small, [Validators.required]],
				middle: [this.pizza.price.middle, [Validators.required]],
				big: [this.pizza.price.big, [Validators.required]]
			})
		});
	}

	showFile(event) {
		this.url = event.src;
		this.file = event.file;
	}

	onSubmit() {
		this.pizzaForm.markAllAsTouched();
		if (this.pizzaForm.valid) {
			this.loading = !this.loading;
			let ingredients: any = this.pizzaForm.get('ingredients').value
			ingredients = ingredients.map(el => el.id);
			const data = Object.assign(this.pizzaForm.value, { ingredients });
			return this.http.edit(this.pizza.id, data)
				.pipe(pluck('result'))
				.subscribe(pizza => {
					if (this.file) {
						this.http.upload(this.pizza.id, this.file).subscribe((result) => {
							this.loading = !this.loading;
							this.notification.showSuccess(`Pizza '${pizza.name}' has been successfully updated!`);
						}, (error) => {
							this.loading = !this.loading;
							this.handler.validation(error, this.pizzaForm);
						});
					} else {
						this.loading = !this.loading;
						this.notification.showSuccess(`Pizza '${pizza.name}' has been successfully updated!`);
					}
				},
					(error) => {
						this.loading = !this.loading;
						this.handler.validation(error, this.uploadImage);
					}
				);
		}
	}

	upload() {

	}
}
