import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password-validator';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { UserDataService } from '../user-data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/module-shared/components/login/login.component';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: UntypedFormGroup;
  spinRegister = false;
  private _ref: DynamicDialogRef;
  constructor(
    private http: UserDataService,
    private formBuilder: UntypedFormBuilder,
    private _ms: MessageService,
    private handler: ErrorHandlerService,
    private _ds: DialogService,
    private _translateService: TranslateService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    if (this._ref) {
      this._ref.destroy();
    }
  }


  ngOnInit(): void {
    this.initForm();
  }

  register(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.spinRegister = true;
      this.http.register(this.registerForm.value).pipe(catchError(e => {
        this.handler.validation(e, this.registerForm);
        this.spinRegister = false;
        this._cd.detectChanges();
        return EMPTY;
      }))
        .subscribe(() => {
          this._ms.add({ severity: 'success', detail: 'We have sent a confirmation email to your email address. Please follow instructions in the email to continue.' })
          this.spinRegister = false;
          this._cd.detectChanges();
        });
    }
  }

  private initForm(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validators: confirmPasswordValidator('confirmPassword', 'password'),
      });
  }

  openAuthModal(): void {
    this._ref = this._ds.open(LoginComponent, { styleClass: 'd-dialog', header: this._translateService.instant('loginLabel') });

    this._ref.onClose.pipe(filter(result => result))
      .subscribe(() => {
        this._router.navigate(['/']);
        this._cd.detectChanges();
      })
  }

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


}
