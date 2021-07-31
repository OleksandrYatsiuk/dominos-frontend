import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PizzaDataService } from '../../../core/services/pizza-data.service';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/core/models/pizza.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaComponent implements OnInit {

  pizzas$: Observable<Pizza[]>;

  constructor(private http: PizzaDataService) { }

  ngOnInit(): void {
    this.pizzas$ = this.http.getPizzas().pipe(pluck('result'))
  }

}
