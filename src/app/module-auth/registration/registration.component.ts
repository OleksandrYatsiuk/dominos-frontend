import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password-validator';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { UserDataService } from '../user-data.service';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { passwordValidator } from 'src/app/core/validators/password-validator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/module-shared/components/login/login.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  spinRegister = false;
  private _ref: DynamicDialogRef;
  constructor(
    private http: UserDataService,
    private formBuilder: FormBuilder,
    private _ms: MessageService,
    private handler: ErrorHandlerService,
    private _ds: DialogService,
    private configService: ApiConfigService,
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
      this.http.register(this.registerForm.value)
        .subscribe(() => {
          this._ms.add({ severity: 'success', detail: 'We have sent a confirmation email to your email address. Please follow instructions in the email to continue.' })
          this.spinRegister = false;
          this._cd.detectChanges();
        }, (error) => {
          this.handler.validation(error, this.registerForm);
          this.spinRegister = false;
          this._cd.detectChanges();
        });
    }
  }

  private initForm(): void {

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(this.configService.getParameter('fullNameMinLength')),
      Validators.maxLength(this.configService.getParameter('fullNameMaxLength')
      )]],
      username: ['', [Validators.required, Validators.minLength(this.configService.getParameter('usernameMinLength')),
      Validators.maxLength(this.configService.getParameter('usernameMaxLength'))]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator(this.configService.getParameter('passwordRegexExp'))]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validators: confirmPasswordValidator('confirmPassword', 'password'),
      });
  }

  openAuthModal(): void {
    this._ref = this._ds.open(LoginComponent, {});
  }

  get fullName() { return this.registerForm.get('fullName'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


}
