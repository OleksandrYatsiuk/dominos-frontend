import { Component, OnInit, ErrorHandler, ElementRef, ViewChild } from '@angular/core';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ingredients } from '../../../core/models/pizza.interface';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatStepper } from '@angular/material';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../pizza-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss']
})
export class PizzaCreateComponent implements OnInit {

  isLinear = false;
  ingredients: Ingredients[];
  selectedFile: File = null;
  imagePath: File = null;
  url: string | ArrayBuffer = '../../assets/data/undefined_image.jpg';

  public spinCreatePizza = false;
  public spinUpload = false;
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
  formCreatingPizza: FormGroup;
  uploadImage: FormGroup;
  pizzaId: string = ""
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


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }
  upload() {
    if (this.selectedFile !== null) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.spinUpload = !this.spinUpload;

      this.http.upload(this.pizzaId, fd).subscribe(result => {
        this.spinUpload = !this.spinUpload;
        this.notification.open({ data: 'Image has been successfully uploaded!' });
        this.router.navigateByUrl('/admin/pizzas')
      });
    }
  }
  onSubmit() {
    this.formCreatingPizza.markAllAsTouched();
    console.log(this.formCreatingPizza.value);
    if (this.formCreatingPizza.valid) {
      this.spinCreatePizza = !this.spinCreatePizza;
      let ingredients: any = this.formCreatingPizza.get('ingredients').value
			ingredients = ingredients.map(el => el.id);
			const data = Object.assign(this.formCreatingPizza.value, { ingredients });
      return this.http.create(data).subscribe(({ code, result }) => {
        if (code === 201) {
          this.pizzaId = result.id || result['_id'];
          this.spinCreatePizza = !this.spinCreatePizza;
          this.notification.open({ data: `Pizza '${result.name}' has been successfully created!` });
        }
      },
        (error) => {
          this.spinCreatePizza = !this.spinCreatePizza;
          this.handler.validation(error, this.formCreatingPizza);
        });
    }
  }
}
