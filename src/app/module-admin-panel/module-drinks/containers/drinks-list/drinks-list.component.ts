import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
