import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';

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



}
