import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Dominos';
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private _pid
  ) {
    this.isBrowser = isPlatformBrowser(_pid)
  }
}
