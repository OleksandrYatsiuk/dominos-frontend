import { Component, OnInit } from '@angular/core';
import { RootService } from 'src/app/shared/root.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  pizzas: any[];

  constructor(private rootService: RootService) {}

  ngOnInit() {
    this.rootService.fetchItems().subscribe(res => {
      this.pizzas = res;
    });
  }
}
