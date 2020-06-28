import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  promotion: any;
  constructor(
    private route: ActivatedRoute,
    private title: Title, ) {
    this.promotion = this.route.snapshot.data.pizza;
  }

  ngOnInit() {
    this.title.setTitle(`Promotion - ${this.promotion.title}`);
  }

}
