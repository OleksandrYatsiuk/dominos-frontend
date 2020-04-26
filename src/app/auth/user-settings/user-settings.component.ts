import { Component, OnInit, ErrorHandler, AfterContentInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RootService } from '../../core/services/root.service';
import { ErrorHeadlerService } from '../../core/services/errorHeadler.service';
import { confirmPasswordValidator } from '../../core/validators/confirm-password-validator';
import { passwordValidator } from '../../core/validators/password-validator';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ValidationMessages } from '../../core/models/error-list';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  message: { type: string; message: string; };
  minDate: Date;
  maxDate: Date;

  private currentUser: any;
  constructor(
    private http: RootService,
    private headler: ErrorHeadlerService,
    private title: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private user: UserService) { }

  public validations = ValidationMessages;
  public updateProfileForm: FormGroup;
  public changePasswordForm: FormGroup;
  public spinEditProfile = false;
  public spinChangePassword = false;

  get currentPassword() { return this.changePasswordForm.get('currentPassword') }
  get newPassword() { return this.changePasswordForm.get('newPassword') }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword') }

  get fullName() { return this.updateProfileForm.get('fullName') }
  get username() { return this.updateProfileForm.get('username') }
  get email() { return this.updateProfileForm.get('email') }
  get birthdaty() { return this.updateProfileForm.get('birthdaty') }
  get phone() { return this.updateProfileForm.get('phone') }



  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear + 0, 0, 31);
    this.initForm()
    this.initUpdateProfile()
    this.title.setTitle('User Settings');
    this.user.setCurrentUser();
    this.user.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.updateProfileForm.patchValue({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          birthday: user.birthday,
          phone: user.phone,
        })
      }
    })
  }

  dateInput($event) {
    console.log($event.target._value)
  }
  onSubmit() {
    this.updateProfileForm.markAllAsTouched();
    if (this.updateProfileForm.valid) {
      this.updateProfileForm.controls.phone.patchValue(this.updateProfileForm.controls.phone.value.replace(/\s+/g, ''))
      this.spinEditProfile = true;
      this.http.updateProfile(this.currentUser['id'], this.updateProfileForm.value).subscribe(({ code }) => {
        if (code === 200) {
          this.spinEditProfile = false;
          this.user.setCurrentUser();
          this.notification.open(
            { data: 'Profile has been successfully updated!' })
        }
      }, (error) => {
        this.spinEditProfile = false;
        this.headler.validation(error, this.updateProfileForm);
      })
    }
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


  }
  initUpdateProfile() {
    this.updateProfileForm = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      username: ["", [Validators.required, Validators.maxLength(15)]],
      email: ["", [Validators.required]],
      birthday: ["", []],
      phone: ["", []],
    })
  }

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.spinChangePassword = true;
      this.http.changePassword(this.changePasswordForm.value).subscribe(() => {
        this.spinChangePassword = false;
        this.notification.open(
          { data: 'Password has been successfully changed!' })
        this.router.navigate(['/']);
      }, (error) => {
        this.spinChangePassword = false;
        this.headler.validation(error, this.changePasswordForm);
      })
    }

  }
}