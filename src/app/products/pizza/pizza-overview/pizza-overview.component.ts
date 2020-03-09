import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '../../../shared/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-pizza-overview',
  templateUrl: './pizza-overview.component.html',
  styleUrls: ['./pizza-overview.component.scss']
})

export class PizzaOverviewComponent implements OnInit {
  pizza: any;
  pizzaForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private rootService: RootService,
    private formBuilder: FormBuilder,
  ) {

    this.pizza = this.route.snapshot.data.pizza;
  }


  ngOnInit() {



    this.pizzaForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      category: ['', [Validators.required]],
      ingredients: [[], [Validators.required]],
      image: [''],
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



  onSubmit(event) {
    console.log(event);
    console.log(this.pizzaForm);
  }
}

