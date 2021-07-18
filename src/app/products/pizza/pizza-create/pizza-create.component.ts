import { Component, OnInit, } from '@angular/core';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Ingredients, Pizza } from '../../../core/models/pizza.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../pizza-data.service';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss']
})
export class PizzaCreateComponent implements OnInit {

  ingredients$: Observable<Ingredients[]>;
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

    this.ingredients$ = this.root.getIngredientsList({ params: { page: 1, limit: 20, sort: 'name' } })
      .pipe(pluck('result'));

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

      const params: Pizza = {
        ...this.form.getRawValue(),
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
