import { Component, OnInit, Input } from '@angular/core';
import { RootService } from 'src/app/shared/root.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  pizzas: any[];
  best: any[];
  firms: any[];
  classic: any[];
  all: any[];
  sortedList: null;
  categories: any[];
  ref: any;


  config = {
    search: false,
    placeholder: 'Сортування',
    displayKey: "value",
  }

  sortCurrent = [{
    current: "asc", value: "Ціна: Нижча-Вища",
  }, {
    current: "desc", value: "Ціна: Вища-Нижча"
  }];

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.getPizzaList();
  }

  getPizzaList() {
    this.rootService.fetchItems().subscribe(res => {
      const response = res['result'];
      this.categories = [
        {
          category: "Краща Ціна",
          items: response.filter(el => el.category === "Краща Ціна")
        },
        {
          category: "Класичні",
          items: response.filter(el => el.category === "Класичні")
        },
        {
          category: "Фірмові",
          items: response.filter(el => el.category === "Фірмові")
        },
      ];
      this.all = response;
    });
  }

  sortBy(event) {
    if (!event.value) {
      this.getPizzaList();
      this.sortedList = null;

    } else {
      this.sortedList = event.value.current;
      this.all.sort((a, b) => {
        return a.price.low - b.price.low;
      })
      if (this.sortedList === "asc") {
        this.all = this.all;
      } else {
        this.all = this.all.reverse();
      }
    }
  }
}
