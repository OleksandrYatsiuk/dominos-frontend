import { Component, OnInit } from '@angular/core';
import { Root, RootService } from '../shared/root.service';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.scss']
})
export class CreatePizzaComponent implements OnInit {

  title: string = ""

  constructor(private rootService: RootService) {

  }
  
  ngOnInit() { }

  createPizza() {
    const pizza: Root = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: new Date()
    }
    

    this.rootService.fetchItems().subscribe((res)=> console.log(res));

    this.rootService.createPizza(pizza);
    this.title = "";
  }


}
