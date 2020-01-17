import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RootService } from '../shared/root.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private rootService: RootService) { }

  private loading: boolean = true;
  private search: string = "";

  ngOnInit() {
    this.rootService.fetchItems().subscribe(() => {
      this.loading = false;
    })
  }

  onChange(id: number) {
    this.rootService.onToggle(id);
  }
  removeItem(id: number) {
    this.rootService.removeItem(id)
      .subscribe(() => {
        this.ngOnInit();
      })
  }

}
