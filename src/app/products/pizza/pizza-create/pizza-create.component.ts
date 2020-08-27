import { Component, OnInit, } from '@angular/core';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Ingredients, Pizza } from '../../../core/models/pizza.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../pizza-data.service';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss']
})
export class PizzaCreateComponent implements OnInit {

  public ingredients: Ingredients[];
  public loading = false;
  public file: FormData;
  public url: string;
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
  form: FormGroup;
  uploadImage: FormGroup;

  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };

  constructor(
    private http: PizzaDataService,
    private root: RootService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private handler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };

    this.root.getIngredientsList({ params: { page: 1, limit: 20, sort: 'name' } })
      .pipe(pluck('result'))
      .subscribe(res => this.ingredients = res)

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      category: ['', [Validators.required]],
      ingredients: [[], [Validators.required]],
      weight: this.formBuilder.group({
        small: ['', [Validators.required]],
        middle: ['', [Validators.required]],
        big: ['', [Validators.required]],
      }),
      price: this.formBuilder.group({
        small: ['', [Validators.required]],
        middle: ['', [Validators.required]],
        big: ['', [Validators.required]],
      }),
      image: [null, []]
    });
  }

  public showFile(event): void {
    this.url = event.src;
    this.file = event.file;
  }

  public onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading = !this.loading;
      let ingredients: any = this.form.get('ingredients').value
      ingredients = ingredients.map(el => el.id);
      const params: Pizza = {
        ...this.form.getRawValue(),
        ingredients: ingredients,
        weight: this.form.get('weight').value,
        price: this.form.get('price').value
      };

      return this.http.create(params).subscribe(result => {
        this.loading = !this.loading;
        this.notification.showSuccess(`Pizza '${result.name}' has been successfully created!`);
        this.router.navigateByUrl('/admin/pizzas')
      }, (error) => {
        this.loading = !this.loading;
        this.handler.validation(error, this.form);
      });
    }
  }
}
