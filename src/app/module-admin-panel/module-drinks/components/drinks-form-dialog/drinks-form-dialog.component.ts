import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DrinksCategory } from '@core/enums/drinks-categories.enum';
import { Drink } from '@core/models/drinks/drinks.model';
import { Select, Store } from '@ngxs/store';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AddDrink, EditDrink } from 'src/app/module-drinks/drinks.actions';
import { DrinksState } from 'src/app/module-drinks/drinks.state';

@Component({
    selector: 'app-drinks-form-dialog',
    templateUrl: './drinks-form-dialog.component.html',
    styleUrls: ['./drinks-form-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DrinksFormDialogComponent implements OnInit {
  form: UntypedFormGroup;
  @Select(DrinksState.drinkCategories) categories$: Observable<SelectItem[]>

  constructor(
    private _ref: DynamicDialogRef,
    private _formBuilder: UntypedFormBuilder,
    private _store: Store,
    private _config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this._initForm(this.drink);
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const file = formValue.image instanceof File ? formValue.image : undefined;
      this._store.dispatch(this.drink ?
        new EditDrink(formValue, file) : new AddDrink({ ...formValue }))
        .subscribe(() => this._ref.close(true));
    }
  }

  private _initForm(drink: Drink): void {
    this.form = this._formBuilder.group({
      id: [drink?.id],
      name: [drink?.name, []],
      category: [drink?.category || DrinksCategory.BEER, []],
      price: [drink?.price || { small: null, middle: null, big: null }, []],
      size: [drink?.size || { small: null, middle: null, big: null }, []],
      image: [drink?.image, []]
    })
  }

  get drink(): Drink {
    return this._config.data?.drink;
  }
}
