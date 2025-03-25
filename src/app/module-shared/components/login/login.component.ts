import { ChangeDetectionStrategy, Component, Injector, OnInit, signal } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Actions, Store } from '@ngxs/store';
import { CurrentUserAction, LoginAction } from 'src/app/module-auth/state/auth.actions';
import { catchError, EMPTY } from 'rxjs';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SpinButtonComponent } from '../spin-button/spin-button.component';
import { ofActionInProcess } from 'src/utils/ngxs.operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe,
    ValidationErrorComponent, ReactiveFormsModule, TranslateModule, InputTextModule, SpinButtonComponent,
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private _ref: DynamicDialogRef,
    private _formBuilder: UntypedFormBuilder,
    private _store: Store,
    private handler: ErrorHandlerService,
    private injector: Injector,
  ) { }

  public form: UntypedFormGroup;

  loading$ = this.injector.get(Actions).pipe(ofActionInProcess(LoginAction));

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  close(): void {
    this._ref.close();
  }

  login(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this._store.dispatch(new LoginAction(this.form.getRawValue()))
        .pipe(catchError(e => {
          this.handler.validation(e, this.form);
          return EMPTY;
        }))
        .subscribe(data => {
          this._store.dispatch(new CurrentUserAction());
          this._ref.destroy();
        });
    }
  }
}

