import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  constructor(
    private router: Router,
    private rootService: RootService) {

  }
  ngOnInit() {

  }


}
