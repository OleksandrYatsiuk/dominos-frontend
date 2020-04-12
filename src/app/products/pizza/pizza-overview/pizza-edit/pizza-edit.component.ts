import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RootService } from 'src/app/core/services/root.service';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
  pizza: any;
  pizzaForm: FormGroup;
  url: string | ArrayBuffer = '../../assets/data/pizzas/default.jpg';
  selectedFile: any;
  imagePath: any;
  ingredients;
  loading = false;
  categories = [{ value: "Краща Ціна" }, { value: "Класичні" }, { value: "Фірмові" }]
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private title: Title,
    private notification: NotificationService,
    private http: RootService,
    private router: Router) {
    this.pizza = this.route.snapshot.data.pizza;
    this.url = this.pizza.image;
  }

  ngOnInit() {
    this.title.setTitle(`Edit - ${this.pizza.name}`)
    this.initForm();
  }

  initForm() {
    this.pizzaForm = this.formBuilder.group({
      name: [this.pizza.name, [Validators.required, Validators.maxLength(15)]],
      category: [this.pizza.category, [Validators.required]],
      ingredients: [this.pizza.ingredients, [Validators.required]],
      image: [this.pizza.image],
      weight: this.formBuilder.group({
        small: [this.pizza.weight.small, [Validators.required]],
        middle: [this.pizza.weight.middle, [Validators.required]],
        big: [this.pizza.weight.big, [Validators.required]],
      }),
      price: this.formBuilder.group({
        low: [this.pizza.price.low, [Validators.required]],
        medium: [this.pizza.price.medium, [Validators.required]],
        high: [this.pizza.price.high, [Validators.required]],
      }),
    });
  }

  onSubmit() {
    console.log(this.pizzaForm);
  }


  upload() {
    if (this.selectedFile !== null) {
      this.loading = !this.loading;
      let fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.http.uploadPhoto(fd).subscribe(result => {
        console.log(result);
        this.pizzaForm.controls.image.setValue(result.fileLink);
        this.loading = !this.loading;
        this.notification.open({ data: "Image has been successfully uploaded!" })
      }
      )
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
