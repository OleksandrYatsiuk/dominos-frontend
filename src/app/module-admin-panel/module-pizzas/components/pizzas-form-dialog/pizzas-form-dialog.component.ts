import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Pizza } from '@core/models/pizza.interface';
import { CategoriesService } from '@core/services/categories/categories/categories.service';
import { IngredientsService } from '@core/services/ingredients.service';
import { Store } from '@ngxs/store';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EMPTY, map, Observable } from 'rxjs';
import { CreateNewPizza, UpdatePizza } from '../../pizzas/pizzas.actions';

@Component({
    selector: 'app-pizzas-form-dialog',
    templateUrl: './pizzas-form-dialog.component.html',
    styleUrls: ['./pizzas-form-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PizzasFormDialogComponent implements OnInit {
  ingredients$: Observable<SelectItem[]>;
  categories$: Observable<SelectItem[]>;
  form: UntypedFormGroup;

  constructor(
    private _ingredientsService: IngredientsService,
    private _categoriesService: CategoriesService,
    private _messageService: MessageService,
    private _lang: LangPipe,
    private _fb: UntypedFormBuilder,
    private _store: Store,
    private _cd: ChangeDetectorRef,
    private _config: DynamicDialogConfig,
    private _ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.ingredients$ = this._ingredientsService.getIngredientsList({ page: 1, limit: 20, sort: 'name' }).pipe(map(ingredients => ingredients.map(i => ({ label: this._lang.transform(i.name), value: i.id }))));
    this.categories$ = this._categoriesService.queryPizzaCategories().pipe(map(categories => categories.map(c => ({ label: this._lang.transform(c.name), value: c.id }))));

    this._initForm(this.pizza);
  }

  private _initForm(pizza?: Pizza): void {
    this.form = this._fb.group({
      id: [pizza?.id],
      name: [pizza?.name, []],
      category: [pizza?.categoryId, [Validators.required]],
      ingredients: [pizza?.ingredients || [], [Validators.required]],
      size: [pizza?.size || { small: '', middle: '', big: '' }, []],
      price: [pizza?.price || { small: '', middle: '', big: '' }, []],
      image: [pizza?.image || null, []]
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const pizza = this.form.getRawValue();
      if (this.pizza) {
        this._store.dispatch(new UpdatePizza(pizza))
          .subscribe(() => {
            this._ref.close(true)
            this._messageService.add({ severity: 'success', detail: `Pizza '${this._lang.transform(pizza.name)}' has been successfully updated!` });
            this._cd.detectChanges();
          });
      } else {
        this._store.dispatch(new CreateNewPizza(pizza))
          .subscribe(result => {
            this._ref.close(true)
            this._messageService.add({ severity: 'success', detail: `Pizza '${this._lang.transform(pizza.name)}' has been successfully created!` });
            this._cd.detectChanges();
          });
      }
    }
  }

  get pizza(): Pizza | undefined {
    return this._config.data?.pizza;
  }
}
