import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../../../core/services/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-pizza-overview',
  templateUrl: './pizza-overview.component.html',
  styleUrls: ['./pizza-overview.component.scss']
})

export class PizzaOverviewComponent implements OnInit {
  pizza: any;
  pizzaForm: FormGroup;
  categories = [{ value: "Краща Ціна" }, { value: "Класичні" }, { value: "Фірмові" }]
  ingredients;
  url: string | ArrayBuffer = '../../assets/data/pizzas/default.jpg';
  selectedFile: any;
  imagePath: any;
  spinUpload = false;
  spinUpddate = false;

  constructor(private route: ActivatedRoute,
    private rootService: RootService,
    private formBuilder: FormBuilder,
    private title: Title,
    private notification: NotificationService
  ) {

    this.pizza = this.route.snapshot.data.pizza;
    this.url = this.pizza.image;
  }


  ngOnInit() {
    this.title.setTitle(`Піца - ${this.pizza.name}`)

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

    // this.rootService.getIngredientsList().subscribe(res => {
    //   this.ingredients = res.result;
    // });
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

  onSubmit() {
    console.log(this.pizzaForm);
  }

  upload() {
    if (this.selectedFile !== null) {
      this.spinUpload = !this.spinUpload;
      let fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.rootService.uploadPhoto(fd).subscribe(result => {
        console.log(result);
        this.pizzaForm.controls.image.setValue(result.fileLink);
        this.spinUpload = !this.spinUpload;
        this.notification.open({ data: "Image has been successfully uploaded!" })
      }
      )
    }
  }
}
