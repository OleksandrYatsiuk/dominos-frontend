import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNewsComponent implements OnInit {
  @Input() news: any;
  defaultImage = '/assets/data/default_image.png';
  constructor() { }

  ngOnInit(): void {
    console.log(this.news);
  }

}
