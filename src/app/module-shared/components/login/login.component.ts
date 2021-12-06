import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Store } from '@ngxs/store';
import { CurrentUserAction, LoginAction } from 'src/app/module-auth/state/auth.actions';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(
    private _ref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private handler: ErrorHandlerService,
    private _cd: ChangeDetectorRef
  ) { }

  public form: FormGroup;
  public spinLogIn = false;

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
      this.spinLogIn = true;

      this._store.dispatch(new LoginAction(this.form.getRawValue()))
        .pipe(catchError(e => {
          this.spinLogIn = false;
          this.handler.validation(e, this.form);
          return EMPTY;
        }))
        .subscribe((data) => {
          this.spinLogIn = false;
          this._store.dispatch(new CurrentUserAction());
          this._ref.destroy();
          this._cd.detectChanges();
        });
    }
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }
  get password(): AbstractControl {
    return this.form.get('password');
  }
}

