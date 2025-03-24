import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { Pizza } from '@core/models/pizza.interface';
import { Store } from '@ngxs/store';
import { CreateNewPizza } from '../../pizzas/pizzas.actions';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LangPipe],
  standalone: true,
  imports: [PizzaFormComponent],
})
export class PizzaCreateComponent {

  public loading = false;

  constructor(
    private _ms: MessageService,
    private _store: Store,
    private _langPipe: LangPipe,
    private _cd: ChangeDetectorRef
  ) { }


  onSubmit(pizza: Pizza): void {
    this.loading = !this.loading;

    this._store.dispatch(new CreateNewPizza(pizza))
      .subscribe((result) => {
        this.loading = !this.loading;
        this._ms.add({ severity: 'success', detail: `Pizza '${this._langPipe.transform(pizza.name)}' has been successfully created!` });
        this._cd.detectChanges();
      });

  }
}
