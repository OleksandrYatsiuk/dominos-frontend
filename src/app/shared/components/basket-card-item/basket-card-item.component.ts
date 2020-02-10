import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-basket-card-item',
  templateUrl: './basket-card-item.component.html',
  styleUrls: ['./basket-card-item.component.scss']
})
export class BasketCardItemComponent implements OnInit {

  @Input() item;


  constructor() { }

  ngOnInit(
  ) {
  }

}
