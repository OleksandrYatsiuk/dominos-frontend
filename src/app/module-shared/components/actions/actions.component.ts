import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, ElementRef, input, TemplateRef, viewChild,
} from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { TranslateOptions } from './actions.interface';

export interface Action<T = string | [string, TranslateOptions]> extends Omit<MenuItem, 'label'> {
  id?: MenuItem['id'];
  command?: MenuItem['command'];
  label?: T;
  permissions?: string[];
  conditions?: boolean[];

}
export type ActionsFn<T = any> = (data?: T) => Action[];
export type ObservableActionsFn<T = any[]> = (data?: T) => Observable<Action[]>;

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, AsyncPipe, TranslateModule, MenuModule],
  standalone: true,
})
export class ActionsComponent<T = any> {
  actions = input.required<ActionsFn<T> | ObservableActionsFn<T>>();

  menu = viewChild(Menu);

  trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');

  template = input<TemplateRef<any>>();

  data = input<T>();

  options$: Observable<MenuItem[]>;

  constructor(private translateService: TranslateService) { }

  toggleFn = this.toggle.bind(this);

  toggle(event: Event): void {
    event.stopPropagation();

    if (this.menu().visible) {
      this.menu().hide();
    } else {
      this.prepareActionsOnShow(event);
    }
  }

  private prepareActionsOnShow(event: Event): void {
    const options = this.actions()(this.data());

    this.options$ = (isObservable(options) ? options : of(options))
      .pipe(
        map((actions) => actions
          .filter((action) => this.filterActions(action))
          .map((action) => ({ ...action, label: this.translateActionLabel(action) }))
        ),
        map((actions) => actions.length ? actions : [{ label: this.translateService.instant('messages.noActions') }]),
        tap(() => {
          this.menu().toggle({ ...event, currentTarget: event.currentTarget || this.trigger().nativeElement });
        }),
      );
  }

  private filterActions(action: Action): boolean {
    const availableByCondition = action.conditions ? this.checkByConditions(action.conditions) : true;

    return availableByCondition;
  }

  private checkByConditions(conditions: boolean[]): boolean {
    return conditions.every((condition) => !!condition);
  }

  private translateActionLabel(action: Action): string {
    if (!action.label) {
      return '';
    }

    if (Array.isArray(action.label)) {
      return this.translateService.instant(action.label[0], this.translateOptions(action.label[1]));
    }

    return this.translateService.instant(action.label);
  }

  private translateOptions(options: TranslateOptions): TranslateOptions {
    if (options) {
      Object.keys(options).forEach((key) => { options[key] = this.translateService.instant(options[key]); });
    }
    return options;
  }
}
