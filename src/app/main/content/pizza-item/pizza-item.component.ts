import { Component, OnInit } from '@angular/core';
import { Root, RootService } from '../../../shared/root.service';


@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent implements OnInit {

  constructor(private rootService: RootService) { }

  private loading: boolean = true;
  private search: string = "";

  ngOnInit() {
    this.rootService.fetchItems().subscribe((res) => {
      this.loading = false;
      console.log(res);
    })
  }

  getPizzaList() {
    this.rootService.fetchItems().subscribe((res) => console.log(res));
  }
}
