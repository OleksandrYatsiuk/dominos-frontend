import { Component, OnInit, Input } from '@angular/core';
import { RootService } from 'src/app/shared/root.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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


  constructor(private rootService: RootService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getPizzaList();
    this.rootService.updatePizzaList.subscribe(res => {
      if (res && res === 'created') {
        this.getPizzaList();
      }
    });
  }
  getPizzaList() {
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
