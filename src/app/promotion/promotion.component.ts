import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Promotion } from './promotion-create/promotions.interface';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  promotion: Promotion;
  constructor(
    private route: ActivatedRoute,
    private title: Title, ) {
    this.promotion = this.route.snapshot.data.promotion;
  }

  ngOnInit() {
    this.title.setTitle(`Promotion - ${this.promotion.title}`);
  }

}
