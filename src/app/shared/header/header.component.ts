import { Component, OnInit } from '@angular/core';
import { RootService } from '../root.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private rootService: RootService) { }

  ngOnInit() {
    this.rootService.$bashChanges
      .subscribe(res => {
        console.log(localStorage.getItem('basket'));

      });
  }

}
