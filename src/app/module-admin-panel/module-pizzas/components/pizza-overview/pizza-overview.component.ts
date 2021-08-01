import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../core/services/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CAN_EDIT_PIZZA } from '../../../../module-pizzas/components/pizza/pizza-permissions';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-pizza-overview',
  templateUrl: './pizza-overview.component.html',
  styleUrls: ['./pizza-overview.component.scss']
})

export class PizzaOverviewComponent implements OnInit {
  pizza: any;
  pizzaForm: FormGroup;
  categories = [{ value: 'Краща Ціна' }, { value: 'Класичні' }, { value: 'Фірмові' }];
  ingredients;
  url: string | ArrayBuffer = '/assets/img/stub-image.png';
  selectedFile: any;
  imagePath: any;
  spinUpload = false;
  spinUpddate = false;
  canEditPizza = CAN_EDIT_PIZZA;
  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private permissionsService: NgxPermissionsService,
    private user: UserService
  ) {

    this.pizza = this.route.snapshot.data.pizza;
    this.url = this.pizza.image;
  }


  ngOnInit() {
    this.user.currentUser.subscribe(user => user ? this.permissionsService.loadPermissions([user['role']]) : false);
    this.title.setTitle(`Піца - ${this.pizza.name}`);
  }
}
