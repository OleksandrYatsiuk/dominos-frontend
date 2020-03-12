import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../../../shared/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { pluck } from 'rxjs/operators';


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

  constructor(private route: ActivatedRoute,
    private rootService: RootService,
    private formBuilder: FormBuilder,
  ) {

    this.pizza = this.route.snapshot.data.pizza;
    this.url = this.pizza.image;
  }


  ngOnInit() {


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

    this.rootService.getIngredientsList().subscribe(res => {
      this.ingredients = res.result;
    });
  }



  onSubmit(event) {
    console.log(event);
    console.log(this.pizzaForm);
  }
}

