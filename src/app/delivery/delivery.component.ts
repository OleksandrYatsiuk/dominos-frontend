import { Component, OnInit, Input } from '@angular/core';
import { RootService } from '../shared/root.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public get list() {
    let index = [];
    let storage = JSON.parse(localStorage.getItem('basket'))
    for (let idx in storage) {
      index.push(storage[idx]);
    }
    return index;
  }

  constructor(
    private router: Router,
    private rootService: RootService) {
  }

  ngOnInit() {

  }


}
