import { Component, OnInit } from '@angular/core';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredients } from '../../../core/models/pizza.interface';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss']
})
export class PizzaCreateComponent implements OnInit {

  ingredients: Ingredients[];
  selectedFile: File = null;
  imagePath: File = null;
  url: string | ArrayBuffer = '../../assets/data/pizzas/default.jpg';

  public spinCreatePizza = false;
  public spinUpload = false;
  categories = [{ value: "Краща Ціна" }, { value: "Класичні" }, { value: "Фірмові" }]
  formCreatingPizza: FormGroup;
  constructor(
    private rootService: RootService,
    private formBuilder: FormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit() {

    this.rootService.getIngredientsList().subscribe(res => {
      this.ingredients = res['result'];
    });

    this.formCreatingPizza = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      category: ['', [Validators.required]],
      ingredients: [[], [Validators.required]],
      image: [null],
      weight: this.formBuilder.group({
        small: ['', [Validators.required]],
        middle: ['', [Validators.required]],
        big: ['', [Validators.required]],
      }),
      price: this.formBuilder.group({
        low: ['', [Validators.required]],
        medium: ['', [Validators.required]],
        high: ['', [Validators.required]],
      }),
    });
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = reader.result;
      };
    }
  }
  upload() {
    if (this.selectedFile !== null) {
      let fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.spinUpload = !this.spinUpload;
      this.rootService.uploadPhoto(fd).subscribe(result => {
        this.formCreatingPizza.controls.image.setValue(result.fileLink);
        this.spinUpload = !this.spinUpload;
        this.notification.open({ data: "Image has been successfully uploaded!" })
      }
      )
    }
  }

  onSubmit() {
    if (this.formCreatingPizza.valid) {
      this.spinCreatePizza = !this.spinCreatePizza;
      return this.rootService.createPizza(this.formCreatingPizza.value).subscribe(({ code, result }) => {
        if (code === 201) {
          this.spinCreatePizza = !this.spinCreatePizza;
          this.notification.open({ data: `Pizza "${result.name}" has been successfully created!` })
        }
      },
        (error) => {
          console.log(error);
          this.spinCreatePizza = !this.spinCreatePizza;
        });
    }
  }
}
