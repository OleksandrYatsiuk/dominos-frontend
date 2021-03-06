import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password-validator';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { UserDataService } from '../user-data.service';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { passwordValidator } from 'src/app/core/validators/password-validator';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private http: UserDataService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private handler: ErrorHandlerService,
    public modal: ModalService,
    private configService: ApiConfigService
  ) { }

  public registerForm: FormGroup;
  get fullName() { return this.registerForm.get('fullName'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  public spinRegister = false;

  ngOnInit(): void {
    this.initForm();
  }

  public register(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.spinRegister = !this.spinRegister;
      this.http.register(this.registerForm.value).subscribe(() => {
        this.notification.showSuccess('We have sent a confirmation email to your email address. Please follow instructions in the email to continue.', false)
        this.spinRegister = !this.spinRegister;
      }, (error) => {
        this.handler.validation(error, this.registerForm);
        this.spinRegister = !this.spinRegister;
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

  private showNotification(): void {
  }

  public openAuthModal(): void {
    this.modal.openLoginModal();
  }
}
