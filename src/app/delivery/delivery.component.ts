import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  constructor(private rootService: RootService) {

  }
  ngOnInit() {

  }



}
