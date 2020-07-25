import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootService } from 'src/app/core/services/root.service';
import { MatStepper } from '@angular/material';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { PizzaDataService } from '../../pizza-data.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  pizza: any;
  pizzaForm: FormGroup;
  uploadImage: FormGroup;
  url: string | ArrayBuffer;
  selectedFile: any;
  imagePath: any;
  ingredients;
  loading = false;
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
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

  ngOnInit(): void {
    this.title.setTitle(`Edit - ${this.pizza.name}`);
    this.rest.getIngredientsList('1','100','name').subscribe(res => {
      this.ingredients = res['result'];
    });
    this.initForm();
  }

  initForm() {
    this.uploadImage = this.formBuilder.group({
      image: [this.pizza.image, [Validators.required]],
    });

    this.pizzaForm = this.formBuilder.group({
      name: [this.pizza.name, [Validators.required, Validators.maxLength(15)]],
      category: [this.pizza.category, [Validators.required]],
      ingredients: [this.pizza.ingredients, [Validators.required]],
      weight: this.formBuilder.group({
        small: [this.pizza.weight.small, [Validators.required]],
        middle: [this.pizza.weight.middle, [Validators.required]],
        big: [this.pizza.weight.big, [Validators.required]],
      }),
      price: this.formBuilder.group({
        small: [this.pizza.price.small, [Validators.required]],
        middle: [this.pizza.price.middle, [Validators.required]],
        big: [this.pizza.price.big, [Validators.required]],
      }),
    });
  }

  onSubmit() {
    this.pizzaForm.markAllAsTouched();
    if (this.pizzaForm.valid) {
      this.loading = !this.loading;
      return this.http.edit(this.pizza.id, this.pizzaForm.value).
        pipe(pluck('result'))
        .subscribe(pizza => {
          this.loading = !this.loading;
          this.notification.open({ data: `Pizza '${pizza.name}' has been successfully updated!` });
          this.myStepper.next();
        },
          (error) => {
            this.loading = !this.loading;
            this.handler.validation(error, this.pizzaForm);
          });
    }
  }

  upload() {
    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.loading = !this.loading;
      this.http.upload(this.pizza.id, fd).subscribe(result => {
        this.loading = !this.loading;
        this.myStepper.next();
        this.notification.open({ data: 'Image has been successfully uploaded!' });
      });
    } else {
      this.myStepper.next();
    }
  }

  onFileSelected(event): void {
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
}



