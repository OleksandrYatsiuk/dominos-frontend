import { Component, OnInit } from '@angular/core';
import { PizzaDataService } from './pizza-data.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  all: any;

  constructor(private http: PizzaDataService) { }

  ngOnInit() {
    this.getPizzaList();
  }
  getPizzaList() {
    this.http.getPizzas().pipe(pluck('result'))
      .subscribe(pizzas => this.all = pizzas);
  }
}
