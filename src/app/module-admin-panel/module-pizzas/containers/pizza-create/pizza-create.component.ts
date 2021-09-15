import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { Pizza } from '@core/models/pizza.interface';
import { PizzaDataService } from '../../../../core/services/pizza-data.service';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe]
})
export class PizzaCreateComponent {

  public loading = false;

  constructor(
    private _ms: MessageService,
    private _router: Router,
    private _pizzaService: PizzaDataService
  ) { }


  onSubmit(pizza: Pizza): void {
    this.loading = !this.loading;
    this._pizzaService.create(pizza)
      .subscribe(result => {
        this.loading = !this.loading;
        this._ms.add({ severity: 'success', detail: `Pizza '${result.name}' has been successfully created!` });
        this._router.navigateByUrl('/admin/pizzas')
      });

  }
}
