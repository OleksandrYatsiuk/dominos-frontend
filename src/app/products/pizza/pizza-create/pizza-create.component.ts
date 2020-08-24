import { Component, OnInit, } from '@angular/core';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Ingredients } from '../../../core/models/pizza.interface';
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
  formCreatingPizza: FormGroup;
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

    this.formCreatingPizza = this.formBuilder.group({
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
    });

    this.uploadImage = this.formBuilder.group({
      image: ['', [Validators.required]],
    });
  }

  setFile(event) {
    console.log(event);
    this.url = event.src;
    this.file = event.file;
  }
  onSubmit() {
    this.formCreatingPizza.markAllAsTouched();
    if (this.formCreatingPizza.valid) {
      this.loading = !this.loading;
      let ingredients: any = this.formCreatingPizza.get('ingredients').value
      ingredients = ingredients.map(el => el.id);
      const data = Object.assign(this.formCreatingPizza.value, { ingredients });
      return this.http.create(data).subscribe(({ result }) => {
        if (this.file) {
          this.http.upload(result.id, this.file).subscribe(res => {
            this.notification.open({ data: `Pizza '${result.name}' has been successfully created!` });
            this.router.navigateByUrl('/admin/pizzas')
          }, (error) => {
            this.loading = !this.loading;
            this.handler.validation(error, this.uploadImage);
          });
        } else {
          this.loading = !this.loading;
          this.notification.open({ data: `Pizza '${result.name}' has been successfully created!` });
          this.router.navigateByUrl('/admin/pizzas')
        }
      }, (error) => {
        this.loading = !this.loading;
        this.handler.validation(error, this.formCreatingPizza);
      });
    }
  }
}
