import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private rootService: RootService) {

  }

  ngOnInit() { }



}
