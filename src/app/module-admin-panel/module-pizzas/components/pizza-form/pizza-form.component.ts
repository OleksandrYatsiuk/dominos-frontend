import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Pizza } from '@core/models/pizza.interface';
import { CategoriesService } from '@core/services/categories/categories/categories.service';
import { IngredientsService } from '@core/services/ingredients.service';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploaderComponent } from '@shared/components/file-uploader/file-uploader.component';
import { SpinButtonComponent } from '@shared/components/spin-button/spin-button.component';
import { LangPipe } from '@shared/pipe/lang.pipe';
import { SelectItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MultiLanguageFieldComponent } from 'src/app/multi-language-field/components/multi-language-field/multi-language-field.component';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss'],
  providers: [LangPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe, ReactiveFormsModule, SpinButtonComponent, FileUploaderComponent, MultiLanguageFieldComponent,
    TranslateModule, SelectModule, MultiSelectModule],
})
export class PizzaFormComponent implements OnInit {
  @Input() loading: boolean;
  @Input() pizza: Pizza;
  @Output() save = new EventEmitter<Pizza>();
  form: UntypedFormGroup;
  ingredients$: Observable<SelectItem[]>;
  categories$: Observable<SelectItem[]>;
  constructor(
    private _fb: UntypedFormBuilder,
    private _ingredientsService: IngredientsService,
    private _categoriesService: CategoriesService,
    private _lang: LangPipe,
  ) { }

  ngOnInit(): void {
    this._initForm(this.pizza);

    this.ingredients$ = this._ingredientsService.getIngredientsList({ page: 1, limit: 20, sort: 'name' }).pipe(map(ingredients => ingredients.map(i => ({ label: this._lang.transform(i.name), value: i.id }))));
    this.categories$ = this._categoriesService.queryPizzaCategories().pipe(map((categories) => categories.map(c => ({ label: this._lang.transform(c.name), value: c.status }))));
  }


  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.save.emit(this.form.getRawValue());
    }
  }

  private _initForm(pizza?: Pizza): void {
    this.form = this._fb.group({
      id: [pizza?.id],
      name: [pizza?.name, []],
      category: [pizza?.category, [Validators.required]],
      ingredients: [pizza?.ingredients || [], [Validators.required]],
      size: [pizza?.size || { small: '', middle: '', big: '' }, []],
      price: [pizza?.price || { small: '', middle: '', big: '' }, []],
      image: [pizza?.image || null, []]
    });
  }

}
