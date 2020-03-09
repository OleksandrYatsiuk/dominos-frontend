import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredients } from '../shared/models/pizza.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {

  ingredients: Ingredients[];
  selectedFile: File = null;
  imagePath: File = null;
  url: string | ArrayBuffer = '../../assets/data/pizzas/default.jpg';

  categories = [{ value: "Краща Ціна" }, { value: "Класичні" }, { value: "Фірмові" }]
  formCreatingPizza: FormGroup;
  constructor(
    private rootService: RootService,
    private formBuilder: FormBuilder,
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
      this.rootService.uploadPhoto(fd).subscribe(result => {
        this.formCreatingPizza.controls.image.setValue(result.fileLink);
      }
      )
    }
  }

  onSubmit() {
    if (this.formCreatingPizza.valid) {
      return this.rootService.createPizza(this.formCreatingPizza.value).subscribe(response => {
        console.log(response);
      });
    }
  }

}
