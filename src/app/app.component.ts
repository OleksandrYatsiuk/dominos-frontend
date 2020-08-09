import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiConfigService } from './core/services/api-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Dominos';
  constructor() { }
}
