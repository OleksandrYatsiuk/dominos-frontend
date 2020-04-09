import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RootService } from 'src/app/core/services/root.service';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ValidationMessages } from '../../core/models/error-list';
import { ErrorHeadlerService } from 'src/app/core/services/errorHeadler.service';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private http: AuthService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notification: NotificationService,
    private headler: ErrorHeadlerService
  ) { }
  public spinRegister = false;
  public validations = ValidationMessages;

  get fullName() { return this.registerForm.get('fullName') };
  get username() { return this.registerForm.get('username') };
  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };
  get confirmPassword() { return this.registerForm.get('confirmPassword') };

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.registerForm.controls.confirmPassword.setValidators([
      Validators.required,
      confirmPasswordValidator(this.registerForm.controls.password),
    ]);
  }

  register() {
    if (this.registerForm.valid) {
      this.spinRegister = !this.spinRegister;
      this.http.register(this.registerForm.value).subscribe(({ code, result }) => {
        if (code === 201) {
          this.notification.open({
            data: "We have sent a confirmation email to your email address. Please follow instructions in the email to continue.",
            duration: null
          })
        }
        this.spinRegister = !this.spinRegister;
      }, (error) => {
        this.headler.validation(error, this.registerForm);
        this.spinRegister = !this.spinRegister;
      })
    }

  }

  openAuthModal() {
    this.modalService.open(LoginComponent);
  }
}
