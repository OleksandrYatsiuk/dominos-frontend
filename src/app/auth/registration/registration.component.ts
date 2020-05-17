import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ValidationMessages } from '../../core/models/error-list';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password-validator';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private http: AuthService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private handler: ErrorHandlerService,
    public dialog: MatDialog,
  ) { }

  public registerForm: FormGroup;
  get fullName() { return this.registerForm.get('fullName'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  public spinRegister = false;
  public validations = ValidationMessages;

  ngOnInit(): void {
    this.initForm();
  }

  public register(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.spinRegister = !this.spinRegister;
      this.http.register(this.registerForm.value).subscribe(() => {
        this.showNotification();
        this.spinRegister = !this.spinRegister;
      }, (error) => {
        this.handler.validation(error, this.registerForm);
        this.spinRegister = !this.spinRegister;
      });
    }
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.registerForm.controls.confirmPassword.setValidators([
      Validators.required,
      confirmPasswordValidator(this.registerForm.controls.password),
    ]);
  }

  private showNotification(): void {
    this.notification.open({
      data: 'We have sent a confirmation email to your email address. Please follow instructions in the email to continue.',
      duration: null
    });
  }

  public openAuthModal(): void {
    this.dialog.open(LoginComponent, { autoFocus: true });
  }
}
