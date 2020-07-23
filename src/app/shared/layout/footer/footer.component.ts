import { Component, OnInit } from '@angular/core';
import { CAN_MANAGE_PIZZA } from '../header/headder-permissions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  public canManagePizza = CAN_MANAGE_PIZZA;
  ngOnInit() {
  }

}
