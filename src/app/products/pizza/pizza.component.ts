import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/core/services/root.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  all: any;

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.getPizzaList();
  }
  getPizzaList() {
    this.rootService.fetchItems().subscribe(res => {
      const response = res['result'];
      this.all = response;
    });
  }
}
