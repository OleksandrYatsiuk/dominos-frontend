import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RootService } from '../core/services/root.service';
import { ErrorHeadlerService } from '../core/services/errorHeadler.service';
import { confirmPasswordValidator } from '../core/validators/confirm-password-validator';
import { passwordValidator } from '../core/validators/password-validator';
import { Router } from '@angular/router';
import { NotificationService } from '../core/services/notification.service';
import { ValidationMessages } from '../core/models/error-list';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  message: { type: string; message: string; };

  constructor(
    private http: RootService,
    private headler: ErrorHeadlerService,
    private title: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService) { }

  public validations = ValidationMessages;
  public updateProfileForm: FormGroup;
  public changePasswordForm: FormGroup;
  public loading = false;
  public spinEditProfile = false;
  public spinChangePassword = false;

  get currentPassword() { return this.changePasswordForm.get('currentPassword') }
  get newPassword() { return this.changePasswordForm.get('newPassword') }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword') }

  get fullName() { return this.updateProfileForm.get('fullName') }
  get username() { return this.updateProfileForm.get('username') }
  get birthdaty() { return this.updateProfileForm.get('birthdaty') }
  get phone() { return this.updateProfileForm.get('phone') }

  ngOnInit() {
    this.title.setTitle('User Settings');
    this.initForm();
  }



  onSubmit() {
    console.log(this.updateProfileForm);
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [passwordValidator(), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required,]],
    })
    this.changePasswordForm.controls.confirmPassword.setValidators([
      Validators.required,
      confirmPasswordValidator(this.changePasswordForm.controls.newPassword),
    ]);

    this.updateProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      birthdaty: ['', []],
      phone: ['', []],
    })
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.spinChangePassword = true;
      this.http.changePassword(this.changePasswordForm.value).subscribe(({ code }) => {
        if (code === 200) {
          this.spinChangePassword = false;
          this.notification.open(
            { data: 'Password has been successfully changed!' })
          this.router.navigate(['/']);
        }
      }, (error) => {
        this.spinChangePassword = false;
        this.headler.validation(error, this.changePasswordForm);
      })
    }

  }
}