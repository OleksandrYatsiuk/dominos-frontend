import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinksListComponent implements OnInit {

  constructor(private _dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onCreateDrink(): void {

  }

}
