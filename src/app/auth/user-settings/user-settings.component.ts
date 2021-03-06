import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/services/errorHandler.service';
import { confirmPasswordValidator } from '../../core/validators/confirm-password-validator';
import { passwordValidator } from '../../core/validators/password-validator';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { UserDataService } from '../user-data.service';
import { ApiConfigService } from 'src/app/core/services/api-config.service';
import { phoneValidator } from 'src/app/core/validators/phone-validator';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { pluck } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  public minDate: NgbDateStruct = { year: 1950, month: 1, day: 1 };
  message: { type: string; message: string; };

  currentUser: any;
  public date: string;
  constructor(
    private http: UserDataService,
    private handler: ErrorHandlerService,
    private title: Title,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private configService: ApiConfigService,
    private userService: UserService,
    public formatter: NgbDateParserFormatter) { }

  public image: File;
  public updateProfileForm: FormGroup;
  public changePasswordForm: FormGroup;
  public imgForm: FormGroup;
  public spinEditProfile = false;
  public spinChangePassword = false;
  private destroy$ = new ReplaySubject<void>(1);

  get currentPassword() { return this.changePasswordForm.get('currentPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }

  get fullName() { return this.updateProfileForm.get('fullName'); }
  get username() { return this.updateProfileForm.get('username'); }
  get email() { return this.updateProfileForm.get('email'); }
  get birthday() { return this.updateProfileForm.get('birthday'); }
  get phone() { return this.updateProfileForm.get('phone'); }

  ngOnInit(): void {
    this.initForm();
    this.initUpdateProfile();
    this.title.setTitle('User Settings');
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.updateProfileForm.patchValue({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          birthday: user.birthday,
          phone: user.phone,
        });
        if (user.image !== null) {
          this.image = user.image;
        }
      }
    });
  }

  showFile(event) {
    this.image = event.file;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  onSubmit() {
    this.updateProfileForm.markAllAsTouched();
    if (this.updateProfileForm.valid) {
      this.spinEditProfile = !this.spinEditProfile;
      this.http.updateProfile(this.updateProfileForm.value)
        .pipe(pluck('result'))
        .subscribe(result => {
          if (this.image instanceof File) {
            this.http.updateImage(this.image)
              .subscribe(result => {
                this.onSuccess(result)
              }, (e) => {
                this.onFail(e)
              })
          } else {
            this.onSuccess(result)
          }
        }, (e) => {
          this.onFail(e)
        });
    }
  }

  private onSuccess(result: object): void {
    this.spinEditProfile = !this.spinEditProfile;
    this.notification.showSuccess('User profile has been successfully updated!')
    this.userService.setCurrentUserData(result)
  }

  private onFail(e: any): void {
    this.spinEditProfile = !this.spinEditProfile;
    this.handler.validation(e, this.updateProfileForm);
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, passwordValidator(this.configService.getParameter('passwordRegexExp'))]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: confirmPasswordValidator('confirmPassword', 'newPassword')
    })
  }

  initUpdateProfile() {
    this.updateProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(this.configService.getParameter('fullNameMinLength')),
      Validators.maxLength(this.configService.getParameter('fullNameMaxLength')
      )
      ]],
      username: ['', [Validators.required,
      Validators.minLength(this.configService.getParameter('usernameMinLength')),
      Validators.maxLength(this.configService.getParameter('usernameMaxLength'))
      ]],
      email: ['', [Validators.required, Validators.email]],
      birthday: [null, []],
      phone: ['', [phoneValidator(this.configService.getParameter('phoneRegexExp'))]],
    });
  }

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.spinChangePassword = true;
      this.http.changePassword(this.changePasswordForm.value).subscribe(() => {
        this.spinChangePassword = false;
        this.notification.showSuccess('Password has been successfully changed!')
        this.changePasswordForm.reset();
      }, (error) => {
        this.spinChangePassword = false;
        this.handler.validation(error, this.changePasswordForm);
      });
    }

  }
}
