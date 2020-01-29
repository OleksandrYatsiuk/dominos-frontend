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

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.rootService.fetchItems().subscribe(res => {
      this.best = res.filter(el => el.category === "Краща Ціна");
      this.firms = res.filter(el => el.category === "Фірмові");
      this.classic = res.filter(el => el.category === "Класичні");
    });
  }

}
