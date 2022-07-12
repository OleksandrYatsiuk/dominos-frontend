import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CAN_EDIT_PIZZA } from '../../../../module-pizzas/components/pizza/pizza-permissions';
import { stubImage } from 'src/utils/stubs';


@Component({
  selector: 'app-pizza-overview',
  templateUrl: './pizza-overview.component.html',
  styleUrls: ['./pizza-overview.component.scss']
})

export class PizzaOverviewComponent implements OnInit {
  pizza: any;
  pizzaForm: UntypedFormGroup;
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
  ingredients;
  url: string | ArrayBuffer = stubImage;
  selectedFile: any;
  imagePath: any;
  spinUpload = false;
  spinUpddate = false;
  canEditPizza = CAN_EDIT_PIZZA;
  constructor(
    private route: ActivatedRoute,
    private title: Title
  ) {

    this.pizza = this.route.snapshot.data.pizza;
    this.url = this.pizza.image;
  }


  ngOnInit() {
    this.title.setTitle(`Піца - ${this.pizza.name}`);
  }
}
