import { Component, OnInit } from '@angular/core';
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

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.rootService.fetchItems().subscribe(res => {

      this.categories = [
        {
          category: "Краща Ціна",
          items: res.filter(el => el.category === "Краща Ціна")
        },
        {
          category: "Фірмові",
          items: res.filter(el => el.category === "Фірмові")
        },
        {
          category: "Класичні",
          items: res.filter(el => el.category === "Класичні")
        }
      ];
      this.all = res;
    });
  }

  sortBy(order) {

    this.sortedList = order.target.value;
    if (this.sortedList === "asc") {
      this.all = this.all.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    } else {
      this.all.sort((a, b) => {
        return a.name - b.name;
      });
      this.all.reverse();
    }
  }

}
